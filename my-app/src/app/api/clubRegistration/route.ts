import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { emailQueue } from './emailQueue'  

export const POST = async (req: NextRequest) => {
  try {
    const { 
      name, 
      idNumber, 
      email, 
      branch,
      gender, 
      countryCode, 
      phoneNumber, 
      residency, 
      hostelName, 
      busRoute, 
      country, 
      state, 
      district, 
      pinCode, 
      domain, 
      clubName, 
      idCardLink, 
      erpPaymentLink 
    } = await req.json();

    console.log(residency);
  
      if (!name) {
          return NextResponse.json({ message: "Name is required"}, { status: 400 });
      }
  
      if (!/^[A-Za-z\s]+$/.test(name)) {
        return NextResponse.json({ message: "Name should contain only letters and spaces"}, { status: 400 });
      }
  
      if (!/^\d{10}$/.test(idNumber)) {
        return NextResponse.json({ message: "Id number should be a 10-digit number"}, { status: 400 });
      }
  
      if (!email) {
          return NextResponse.json({ message: "Email is required"}, { status: 400 });
      }

      if (!branch) {
        return NextResponse.json({ message: "Branch is required"}, { status: 400 });
      }
  
      if (!/^[A-Za-z0-9._%+-]+@kluniversity\.in$/.test(email)) {
        return NextResponse.json({ message: "Email should be a valid KL University email address"}, { status: 400 });
      }
  
      if (!gender) {
          return NextResponse.json({ message: "Gender is required"}, { status: 400 });
      }

      if (!residency) {
        return NextResponse.json({ message: "Residency is required"}, { status: 400 });
      }
  
      if (residency === "Hosteler" && !hostelName) {
        return NextResponse.json({ message: "Hostel name is required"}, { status: 400 });
      }

  
      if (residency === "Day Scholar" && !busRoute) {
        return NextResponse.json({ message: "Bus route is required"}, { status: 400 });
      }

      if (!country) {
        return NextResponse.json({ message: "Country is required"}, { status: 400 });
      }
  
      if (country === "India") {
        if (!state || !district || !pinCode) {
          return NextResponse.json({ message: "State, district, pinCode is required"}, { status: 400 });
        }
      }

      if (!pinCode) {
        return NextResponse.json({ message: "Pin code is required"}, { status: 400 });
      }
  
      if (!domain || !clubName) {
          return NextResponse.json({ message: "Domain and club name is required"}, { status: 400 });
      }

      if (!idCardLink || !erpPaymentLink) {
        return NextResponse.json({ message: "Id card link and ERP payment link are required"}, { status: 400 });
    }

      console.log(residency);

    const query = `
        INSERT INTO club_registration (
            name, id_number, email_id, branch, gender, country_code, phone_number,
            residency, hostel_name, bus_route, country, state, district,
            pincode, domain, club_name, id_card_link, erp_payment_link
        ) 
        VALUES (
            ?, ?, ?, ?, ?, ?, 
            ?, ?, ?, ?, ?, ?, 
            ?, ?, ?, ?, ?, ?
        );
    `;

    const values = [
        name, 
        idNumber, 
        email, 
        branch,
        gender, 
        countryCode, 
        phoneNumber, 
        residency, 
        hostelName, 
        busRoute, 
        country, 
        state, 
        district, 
        pinCode, 
        domain, 
        clubName, 
        idCardLink, 
        erpPaymentLink
    ];
    
    const [result] = await pool.execute(query, values);

    const emailJob = {
      email: email,
      subject: `Message from student club registration`,
      text: `Hello ${name},\n\nYou have successfully registered for ${clubName} club. Please wait for the club lead to approve your registration.`
    };

    await emailQueue.add(emailJob);

    return NextResponse.json({ message: "You have successfully registered. Confirmation email is on its way." }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};