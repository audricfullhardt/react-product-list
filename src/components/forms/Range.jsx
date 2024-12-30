export function Range ({ min, max, value, onChange }) {
    return <div>
        <input 
            type="range"
            className="form-range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
        />
    </div>
}
