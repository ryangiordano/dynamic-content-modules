class Error{
  constructor(el, error){
    let errorElement = "<li style='padding:5px; margin:10px;color:white; background-color:red; list-style:none';' class='animated fadeInDown'><p style='font-family:Arial,Helvetica,sans-serif'>"+error+"</p></li>"
    $(el).append(errorElement)
  }

}
