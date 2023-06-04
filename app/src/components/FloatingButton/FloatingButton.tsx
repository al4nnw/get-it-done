interface FloatingButtonProps {
  elementType: "button" | "div";
  imageIcon: any;
  elementText: string;
}

export default function FloatingButton({
  elementText,
  elementType,
  imageIcon,
}: FloatingButtonProps) {
  const Element = elementType;
  return (
    <Element>
      <img src={imageIcon} alt="" aria-hidden="true" />
      <span>{elementText}</span>
    </Element>
  );
}
