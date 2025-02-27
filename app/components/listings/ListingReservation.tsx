'use client';

import Calendar from '../inputs/Calendar'; // Custom calendar component
import Button from '../Button';
import { useState } from 'react';

interface ListingReservationProps {
    price: number;
    reservationDate: Date | null;
    totalPrice: number;
    onChangeDate: (value: Date) => void;
    onSubmit: (reservationDate: Date, selectedProvider: string) => void;
    disabled?: boolean;
    disabledDates: Date[];
    providers: { id: string; name: string }[];
}

const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    reservationDate,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
    providers
}) => {
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [selectedProvider, setSelectedProvider] = useState<string>("");

    const handleTimeSlotSelect = (time: string) => {
        setSelectedTime(time);
    };

    const combineDateAndTime = (date: Date, time: string): Date => {
        const [hours, minutes] = time.split(':');
        const newDate = new Date(date);
        newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return newDate;
    };

    const handleSubmit = () => {
        console.log("Booking Attempt:", { reservationDate, selectedTime, selectedProvider }); // Debugging
    
        if (!reservationDate) {
            alert("Veuillez sélectionner une date.");
            return;
        }
    
        if (!selectedTime) {
            alert("Veuillez sélectionner une heure.");
            return;
        }
    
        if (!selectedProvider) {
            alert("Veuillez sélectionner un prestataire.");
            return;
        }
    
        const finalDateTime = combineDateAndTime(reservationDate, selectedTime);
        onSubmit(finalDateTime, selectedProvider);
    };
    

    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="p-4">
                <label className="font-semibold text-lg">Choisir un prestataire</label>
                <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedProvider} 
                    onChange={(e) => setSelectedProvider(e.target.value)}
                >
                    <option value="">Sélectionner un prestataire</option>
                    {(providers || []).map((provider) => (
                        <option key={provider.id} value={provider.id}>{provider.name}</option>
                    ))}
                </select>
            </div>
            <hr />
            <Calendar 
                value={{ startDate: reservationDate || new Date(), endDate: reservationDate || new Date() }}
                disabledDates={disabledDates} 
                onChange={(date) => {
                    console.log("Selected Date:", date); // Debugging
                    onChangeDate(date);
                }}
            />

            <hr />
            <div className="p-4">
                <label className="font-semibold text-lg">Sélectionnez une heure</label>
                <div className="flex flex-wrap gap-4 mt-2">
                    {timeSlots.map((time) => (
                        <button
                            key={time}
                            onClick={() => handleTimeSlotSelect(time)}
                            className={`p-2 border rounded-md ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>
            <hr />
            <div className="p-4">
            <Button 
                disabled={disabled || !selectedTime || !selectedProvider || !reservationDate} 
                label="Réserver" 
                onClick={() => {
                    console.log("Button Clicked!"); // Debugging
                    handleSubmit();
                }} 
            />
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>Total</div>
                <div>Dhs {totalPrice}</div>
            </div>
        </div>
    );
}

export default ListingReservation;
