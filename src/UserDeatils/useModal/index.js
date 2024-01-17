import React, { useState } from 'react';
import './index.css'; // You may need to create a corresponding CSS file for styling

const Modal = ({ isOpen, onClose, selectedPost }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal" style={{ width: "600px", height: "500px" }}>
                        <div className="modal-header">
                            {/* Header content goes here */}
                        </div>
                        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column' }}>
                            {selectedPost && (
                                <>
                                    <div>
                                        <div className='id_select' style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong>ID:</strong> {selectedPost.id}
                                        </div>
                                        <div className='title_select' style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong>Title:</strong> {selectedPost.title}
                                        </div>
                                        <div className='body_select'>
                                            <strong></strong> {selectedPost.body}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="close-button" onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Modal;
