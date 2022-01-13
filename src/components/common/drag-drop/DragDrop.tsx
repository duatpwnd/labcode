import { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { getBase64 } from "src/utils/common";
import "./DragDrop.scoped.scss"
const fileTypes = ["JPG", "PNG", "GIF", "SVG"];
const DragDrop = () => {
    const banner = useRef(null)
    const [file, setFile] = useState(null)
    const dragEnterHandler = () => {
        console.log("enter");
        const current = banner.current as unknown as HTMLDivElement;
        current.style.border = "1px dotted black"
    }
    const dragLeaveHandler = () => {
        console.log("leave")
        const current = banner.current as unknown as HTMLDivElement;
        current.style.border = "1px solid #e6e8eb"
    }
    const handleChange = (file) => {
        getBase64(file).then((result: any) => {
            setFile(result);
        })
    };
    useEffect(() => {

    }, [])
    return (
        <div ref={banner} className="banner" onDragEnterCapture={dragEnterHandler} onDragLeaveCapture={dragLeaveHandler}>
            <FileUploader hoverTitle={" "} handleChange={handleChange} name="file" types={fileTypes} children={<div className="outline" >
                {file != null &&
                    <img src={file} alt="LABCODE" title="LABCODE" className="image" />
                }
            </div>} />
            <div></div>
        </div>

    );
}
export default DragDrop;