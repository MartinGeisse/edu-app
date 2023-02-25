import {shallowNormalizeStaticInlineContent, StaticInlineContent} from "./StaticInlineContent";

export type StaticInlineContentViewProps = {
    content: StaticInlineContent;
};

export function StaticInlineContentView(props: StaticInlineContentViewProps) {
    const content = shallowNormalizeStaticInlineContent(props.content);
    switch (content.type) {

        case "sequence":
            return <div>{content.elements.map((element: StaticInlineContent) => <StaticInlineContentView content={element} />)}</div>;

        case "plainText":
            return <p>{content.text}</p>;

        default:
            return <div style={{color: "red"}}>UNKNOWN ELEMENT TYPE</div>;

    }
}
