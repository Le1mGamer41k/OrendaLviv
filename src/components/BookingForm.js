import React, { useEffect } from 'react';
import '../styles/styles.css';
import '../styles/booking_additional.css';
import { useSearchParams } from 'react-router-dom';

const BookingForm = () => {
    const [params] = useSearchParams();

    useEffect(() => {
        const apt = params.get('apartment');
        if (apt) {
            document.getElementById('apartment').value = apt;
        }
    }, [params]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const booking = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            apartment: form.apartment.value.trim(),
            message: form.message.value.trim()
        };

        if (!booking.name || !booking.email || !booking.phone) {
            alert("Заповніть усі обов'язкові поля!");
            return;
        }

        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        alert(`Дякуємо, ${booking.name}! Ваша заявка прийнята.`);
        form.reset();
    };

    return (
        <div className="booking-container">
            <h1>Оформлення заявки на оренду</h1>
            <form id="booking-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Ваше ім'я:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="phone">Телефон:</label>
                <input type="tel" id="phone" name="phone" required />

                <label htmlFor="apartment">Обрана квартира:</label>
                <input type="text" id="apartment" name="apartment" readOnly />

                <label htmlFor="message">Додаткова інформація:</label>
                <textarea id="message" name="message"></textarea>

                <button type="submit">Надіслати заявку</button>
            </form>
        </div>
    );
};

export default BookingForm;
