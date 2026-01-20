// app/api/cron/send-reminders/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import twilio from "twilio";

// Initialize Supabase Admin Client (Service Role needed to access all data)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Ensure this is in your .env
);

// Initialize Twilio
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function GET() {
  try {
    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
    
    // Get current time in minutes from midnight for comparison
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // 1. Fetch all active schedules for TODAY
    const { data: schedules, error } = await supabase
      .from("virtual_class_schedules")
      .select(`
        *,
        staff:staff_profiles(full_name, phone_number),
        student:students(full_name, parent_phone),
        school:schools(name)
      `)
      .eq("day_of_week", currentDay)
      .eq("is_active", true)
      .eq("reminder_enabled", true);

    if (error) throw error;
    if (!schedules || schedules.length === 0) {
      return NextResponse.json({ message: "No schedules for today" });
    }

    const results = [];

    // 2. Iterate through schedules and check time
    for (const schedule of schedules) {
      // Parse start_time (e.g., "14:30:00")
      const [hours, minutes] = schedule.start_time.split(":");
      const classStartMinutes = parseInt(hours) * 60 + parseInt(minutes);
      
      const minutesUntilClass = classStartMinutes - currentMinutes;
      const reminderTime = schedule.reminder_time || 30;

      // Check if we are within the reminder window (e.g., class is in 30 mins)
      // We use a small buffer (e.g., 0-15 mins window) to ensure we don't miss it 
      // if the cron runs every 10 mins.
      if (minutesUntilClass > 0 && minutesUntilClass <= reminderTime && minutesUntilClass > (reminderTime - 15)) {
        
        const meetLink = schedule.google_meet_link || "Link will be shared shortly";
        const subject = schedule.subject;
        
        // 3. Send to Student's Parent
        if (schedule.student?.parent_phone) {
          const message = `📚 *Class Reminder*\n\nHello! This is a reminder that ${schedule.student.full_name}'s class on *${subject}* is starting in about ${minutesUntilClass} minutes.\n\n🔗 Join here: ${meetLink}`;
          
          await sendWhatsApp(schedule.student.parent_phone, message);
          results.push({ sentTo: "Student", id: schedule.id });
        }

        // 4. Send to Staff/Teacher
        if (schedule.staff?.phone_number) {
           const message = `👨‍🏫 *Teaching Reminder*\n\nHi ${schedule.staff.full_name}, your class with ${schedule.student?.full_name || "Group"} on *${subject}* starts in ${minutesUntilClass} minutes.\n\n🔗 Link: ${meetLink}`;
           
           await sendWhatsApp(schedule.staff.phone_number, message);
           results.push({ sentTo: "Staff", id: schedule.id });
        }
      }
    }

    return NextResponse.json({ success: true, processed: results.length, details: results });

  } catch (error: any) {
    console.error("Cron Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Helper function to format number and send
async function sendWhatsApp(to: string, body: string) {
  // Ensure number has country code. Remove '0' at start if needed.
  // Example: Convert "08012345678" to "+2348012345678" assuming Nigeria
  // Ideally, store phones in E.164 format (+234...) in database.
  let formattedNumber = to.trim();
  
  // Basic fix for Nigerian numbers if stored without country code
  if (formattedNumber.startsWith("0") && !formattedNumber.startsWith("00")) {
    formattedNumber = "+234" + formattedNumber.substring(1);
  }
  
  if (!formattedNumber.startsWith("+")) {
    console.warn(`Invalid phone format skipped: ${formattedNumber}`);
    return;
  }

  try {
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedNumber}`,
      body: body,
    });
    console.log(`WhatsApp sent to ${formattedNumber}`);
  } catch (err) {
    console.error(`Failed to send to ${formattedNumber}`, err);
  }
}