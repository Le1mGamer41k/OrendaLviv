import React, { useEffect, useState } from 'react';
import '../styles/styles.css';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('bookings')) || [];
        setBookings(saved);
    }, []);

    const downloadBookings = () => {
        if (!bookings.length) return alert('Немає збережених бронювань.');

        const content = bookings.map((b, i) =>
            `Бронювання #${i + 1}:\nІм'я: ${b.name}\nEmail: ${b.email}\nТелефон: ${b.phone}\nКвартира: ${b.apartment}\nКоментар: ${b.message}\n`
        ).join('\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'Мої_бронювання.txt';
        a.click();
    };

    return (
        <div className="booking-list">
            <h2>Ваші бронювання</h2>
            <div id="bookings-container">
                {bookings.length === 0
                    ? <p>Поки що немає бронювань.</p>
                    : bookings.map((b, i) => (
                        <div key={i} className="booking-item">
                            <h3>Бронювання #{i + 1}</h3>
                            <p><strong>Імʼя:</strong> {b.name}</p>
                            <p><strong>Email:</strong> {b.email}</p>
                            <p><strong>Телефон:</strong> {b.phone}</p>
                            <p><strong>Квартира:</strong> {b.apartment}</p>
                            <p><strong>Коментар:</strong> {b.message}</p>
                            <hr />
                        </div>
                    ))
                }
            </div>
            <button className="download-button" onClick={downloadBookings}>⬇️ Завантажити бронювання у файл</button>
        </div>
    );
};

export default MyBookings;
