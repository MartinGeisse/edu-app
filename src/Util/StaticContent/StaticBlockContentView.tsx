import {shallowNormalizeStaticBlockContent, StaticBlockContent} from "./StaticBlockContent";
import {StaticInlineContentView} from "./StaticInlineContentView";

export type StaticBlockContentViewProps = {
    content: StaticBlockContent;
};

export function StaticBlockContentView(props: StaticBlockContentViewProps) {
    const content = shallowNormalizeStaticBlockContent(props.content);
    switch (content.type) {

        case "sequence":
            return <div>{content.elements.map(element => <StaticBlockContentView content={element} />)}</div>;

        case "paragraph":
            return <div style={{textAlign: content.align ?? "left"}}>
                <StaticInlineContentView content={content.content} />
            </div>;

        case "image":
            return <div style={{textAlign: "center"}}>
                <img style={{width: "70%"}} src={content.image} alt={"content"} />
            </div>;

        default:
            return <div style={{color: "red"}}>UNKNOWN ELEMENT TYPE</div>;

    }
}
