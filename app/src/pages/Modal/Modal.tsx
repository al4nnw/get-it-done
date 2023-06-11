import classNames from "classnames";
import style from "./Modal.module.scss";

interface ModalProps {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export default function Modal({ isModalOpen, setModalOpen }: ModalProps) {
  return (
    <section
      className={classNames({
        [style.modal]: true,
        [style.isModalOpen]: isModalOpen,
      })}
    >
      <h1>CHANGE PASSWORD</h1>
      <button onClick={() => setModalOpen(false)}>Close modal</button>
    </section>
  );
}
