type LegendItem = {
    title: string;
    color: string;
    textColor: string;
}

type LegendProps = {
    legendItems: LegendItem[];
}


const Legend = ({legendItems}: LegendProps) => {
    return (
    <div 
    style = {{
        display: "flex",
        alignItems: "stretch"
    }}>
        {legendItems.map((item: LegendItem)=> (
            <div
            key = {item.title}
            style={{
                backgroundColor: item.color,
                flex:1,
                display:"flex",
                alignItems: "center",
                justifyContent: "center",
                color: item.textColor,
                height:"10vh",
                fontWeight: "bolder",
                fontSize: "1.5em"
            }}> 
            <span>{item.title}</span></div>
        ))}
    </div>
)
}


export default Legend