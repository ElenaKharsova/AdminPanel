export default function Toast({message, type}) { 
     
  return(
    <div className={`toast toast_${type}`}>
      {message}    
    </div>
  );
}