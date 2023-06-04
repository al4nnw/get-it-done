import { Link } from "react-router-dom";

interface FloatingButtonProps {
  imageIcon: any;
  elementLink: string;
  elementText: string;
}

export default function FloatingLink({
  elementText,
  elementLink,
  imageIcon,
}: FloatingButtonProps) {
  return (
    <Link to={elementLink}>
      <img src={imageIcon} alt="" aria-hidden="true" />
      <span>{elementText}</span>
    </Link>
  );
}
