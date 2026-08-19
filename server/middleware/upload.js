import multer from "multer";


const storage = multer.diskStorage({

  destination:(req,file,cb)=>{

    cb(null,"uploads/");

  },


  filename:(req,file,cb)=>{

    cb(
      null,
      Date.now()+"-"+file.originalname
    );

  }

});



const fileFilter = (req,file,cb)=>{


  const allowed = [

    ".pdf",
    ".doc",
    ".docx",
    ".txt"

  ];



  const ext =
  file.originalname
  .toLowerCase()
  .slice(
    file.originalname.lastIndexOf(".")
  );



  if(allowed.includes(ext)){

    cb(null,true);

  }
  else{

    cb(
      new Error("Only PDF DOC DOCX TXT allowed"),
      false
    );

  }


};



const upload = multer({

  storage,

  fileFilter,

  limits:{
    fileSize:10 * 1024 * 1024
  }

});


export default upload;