// src/components/Modal.js
import React from 'react';
import { motion } from 'framer-motion';
import './Modal.css'; // We'll create this css

function Modal({ children, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <motion.div
                className="modal-content"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </motion.div>
        </div>
    );
}

export default Modal;
