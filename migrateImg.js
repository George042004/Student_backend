const mongoose = require("mongoose");
const path = require("path");

const users = require("./models/userModels");          // Change if your model path is different
const cloudinary = require("./config/cloudinary");    // Change if your config path is different

async function migrateImages() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb://localhost:27017/studentsdb");
        console.log("✅ MongoDB Connected");

        const students = await users.find();

        console.log(`Found ${students.length} students`);

        for (const student of students) {

            // Skip if already on Cloudinary
            if (!student.img || student.img.startsWith("http")) {
                console.log(`Skipped: ${student.name}`);
                continue;
            }

            const imagePath = path.join(__dirname, student.img);

            console.log(`Uploading: ${imagePath}`);

            const result = await cloudinary.uploader.upload(imagePath, {
                folder: "students"
            });

            console.log("Cloudinary URL:", result.secure_url);

            student.img = result.secure_url;

            await student.save();

            console.log(`✅ Updated: ${student.name}`);
        }

        console.log("🎉 Migration Completed");

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB Disconnected");
    }
}

migrateImages();