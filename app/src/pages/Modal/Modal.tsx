import style from "./Modal.module.scss";

export default function Modal({ children }: { children: React.ReactNode }) {
  return <section className={style.modal}>{children}</section>;
}
