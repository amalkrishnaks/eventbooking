import './input.css';

const Input=({label,onChange,value,type="text"})=>{
    return(
            <div className="input">
                <label>{label}</label>
                <input value={value} onChange={onChange} type={type} />
            </div>
    );
};

export default Input;