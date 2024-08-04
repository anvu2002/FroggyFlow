import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, { params }) => {
    const body = await req.json();
    const propertiesToSet= ['name', 'email','username'];
    console.log("PARAMS = ",params);
    try {
        await connectToDB();
        const existingUser = await User.findById(params.id);
        console.log("body = ", body);
        if (!existingUser) {
            console.log("Setting NEW USER");
            console.log("BODY = ",body);
            const newUser = new User({
                name: body['name'],
                username: body['username'],
                email: body['email'],
            });
            
            await newUser.save();
            return new Response(JSON.stringify(newUser), { status: 201 });

        } else{
            console.log("UPDATING user");
            propertiesToSet.forEach(property => {
                existingUser[property] = body[property]
            });
            return new Response("Successfully updated User", { status: 200 });
        }
       
       
    } catch (error) {
        console.error('[setUserById] Error:', error);
        return new Response("Internal Server Error", { status: 500 });
    }

}