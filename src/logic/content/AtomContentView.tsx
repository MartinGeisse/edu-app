import {AtomContent, normalizeAtomContent} from "./AtomContent";

export type AtomContentViewProps = {
    content: AtomContent;
};

export function AtomContentView(props: AtomContentViewProps) {
    const content = normalizeAtomContent(props.content);
    switch (content.type) {

        case "sequence":
            return <div>{content.elements.map(element => <AtomContentView content={element} />)}</div>;

        case "plainText":
            return <p>{content.text}</p>;

        case "drawing":
            return <div>TODO</div>;

        default:
            return <div style={{color: "red"}}>UNKNOWN ELEMENT TYPE</div>;

    }
}
