class Flag{
  constructor(el, flag){
    let flagElement = "<li style='padding:5px; margin:10px;color:white; background-color:red; list-style:none';' class='animated fadeInDown'><p style='font-family:Arial,Helvetica,sans-serif'>"+flag+"</p></li>"
    $(el).append(flagElement)
  }

}
