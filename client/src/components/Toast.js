// src/components/Toast.js
import React from 'react';
import { motion } from 'framer-motion';
import './Toast.css'; // (You can add small CSS for it)

function Toast({ message, type = 'success', onClose }) {
    return (
        <motion.div
            className={`toast ${type}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
        >
            {message}
        </motion.div>
    );
}

export default Toast;
