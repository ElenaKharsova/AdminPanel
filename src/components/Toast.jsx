export default function Toast({message, type}) { 
  return(
    <div 
      className={`toast toast_${type}`} 
      role={type === "error" ? "alert" : "status"}>
      {message}    
    </div>
  );
}