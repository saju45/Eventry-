"use server"

import EmailTemplate from "@/components/payment/EmailTemplate";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const { createUser, findUserByCredentials, updateInterested, updateGoing, getEventById } = require("@/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formData){

    const user=Object.fromEntries(formData);
    const created=await createUser(user);
    redirect("/login")
}

async function performLogin(formData){

    try {
        
    const credentials={};
    credentials.email=formData.get('email');
    credentials.password=formData.get('password');
    const found=await findUserByCredentials(credentials);
    return found;

    } catch (error) {
        throw error;
    }

    
}

async function addInterestedEvent(eventId,authId){

    try {
        await updateInterested(eventId,authId);
    } catch (error) {
        throw error;
    }
    revalidatePath('/')
}

async function addGoingEvnet(eventId,user){

    try {
        await updateGoing(eventId,user?.id);
        await sendEmail(eventId,user)
    } catch (error) {
        throw error;
    }

    revalidatePath('/');
    redirect("/")
}

async function sendEmail(eventId, user) {
    try{
      console.log(eventId, user, process.env.RESEND_API_KEY);
      const event = await getEventById(eventId);
      const resend = new Resend(process.env.RESEND_API_KEY);
      const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
      const sent = await resend.emails.send({
        from: "",
        to: user?.email,
        subject: "Successfully Registered for the event!",
        react: EmailTemplate({ message })
      });
    } catch (error) {
      throw error;
    }
  }
export { addGoingEvnet, addInterestedEvent, performLogin, registerUser, sendEmail };

