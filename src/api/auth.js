const API_URL = "http://localhost:5000/api/auth";


// REGISTER

export const registerUser = async (userData)=>{

    try{

        const response = await fetch(
            `${API_URL}/register`,
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(userData)
            }
        );


        return await response.json();


    }
    catch(error){

        console.log("Server Error:",error);

        return {
            message:"Server connection failed"
        };

    }

};




// LOGIN

export const loginUser = async (userData)=>{


    try{


        const response = await fetch(

            `${API_URL}/login`,

            {

                method:"POST",


                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify(userData)

            }

        );



        const data = await response.json();



        // SAVE TOKEN

        if(data.token){


            localStorage.setItem(

                "token",

                data.token

            );



            localStorage.setItem(

                "user",

                JSON.stringify(data.user)

            );


        }




        return data;



    }

    catch(error){


        console.log(

            "Server Error:",

            error

        );


        return {

            message:"Server connection failed"

        };


    }


};