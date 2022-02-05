import { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { getBase64 } from "src/utils/common";
import "./DragDrop.scoped.scss"
const fileTypes = ["JPG", "PNG", "GIF", "SVG"];
const DragDrop = (props) => {
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
        const current = banner.current as unknown as HTMLDivElement;
        props.eventHandler(file);
        getBase64(file).then((result: any) => {
            setFile(result);
            current.style.border = "1px solid #e6e8eb"
        })
    };
    useEffect(() => {
        if (props.link != "") {
            setFile(props.link)
        } else {
            setFile(null);
        }
    }, [props.link])
    return (
        <div style={{ width: props.style.width }} ref={banner} className="banner" onDragEnterCapture={dragEnterHandler} onDragLeaveCapture={dragLeaveHandler}>
            <FileUploader hoverTitle={" "} handleChange={handleChange} name="file" types={fileTypes} children={<div className="outline" style={{ height: props.style.height }} >
                {file == null ?
                    <button className="add-btn"></button> :
                    <img src={file} alt="LABCODE" title="LABCODE" className="image" />
                }
            </div>} />
        </div>

    );
}
export default DragDrop;