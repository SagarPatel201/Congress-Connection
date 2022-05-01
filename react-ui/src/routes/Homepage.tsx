import {Paper} from "@mui/material";

export default function Homepage() {
    return (
        <div>
            <Paper style={{
                backgroundImage: "url(/capitolhill.jpeg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}/>
        </div>
    );
}
