import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { AiOutlineClose } from 'react-icons/ai';

const Modal = React.forwardRef((props, ref) => {
  const { onClose, children, show } = props
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModalWrapper ref={ref}>
        <StyledModal>
          <StyledModalHeader>
            <a href="#" onClick={handleCloseClick}>
              <AiOutlineClose color="#FFF"/>
            </a>
          </StyledModalHeader>
          <StyledModalBody>{children}</StyledModalBody>
        </StyledModal>
      </StyledModalWrapper>
    </StyledModalOverlay>
  ) : <div></div> ;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
});

const StyledModalBody = styled.div`
    padding: 10px;
    margin-top: auto;
    margin-bottom: auto;
  `;

const StyledModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 25px;
  `;

const StyledModalWrapper = styled.div`
    font-family: Roboto;
    font-weight: 400;
    line-height: 25.78px;
    text-align: center;
    width: 420px;
    height: auto;
    `;

const StyledModal = styled.div`
    background: #424242;
    height:100%;
    width:100%;
    border-radius: 15px;
    padding: 20px;
    display: flex;
    vertical-align: middle;
    flex-direction: column;
  `;

const StyledModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  `;

export default Modal;