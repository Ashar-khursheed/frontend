import React, { useEffect, useState } from "react";

export const Rating = ({ rating, classes }) => {
    const [criteria, setCriteria] = useState(rating)

    useEffect(() => {
        let rate = Math.round(Number(rating))
        setCriteria(rate)
    }, [rating])

    return (
        <div className={`flex flex-row items-center ${classes}`}>
            {Array.from({ length: 5 }, (_, i) => {
                return (
                    <span key={i} className="mr-1">
                        <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                            <path fill={`${criteria > i ? "#FCB800" : "#64748B"}`} d="M5.8638 0.722089L6.7437 2.49644C6.8637 2.74343 7.18365 2.98035 7.45365 3.02571L9.04845 3.29287C10.0684 3.46426 10.3083 4.2103 9.5734 4.94625L8.33355 6.19635C8.12355 6.40805 8.0086 6.81635 8.07355 7.10875L8.42855 8.65625C8.7085 9.88115 8.06355 10.355 6.9887 9.7148L5.49385 8.8226C5.2239 8.6613 4.77895 8.6613 4.50395 8.8226L3.00913 9.7148C1.93925 10.355 1.28932 9.8761 1.56929 8.65625L1.92425 7.10875C1.98924 6.81635 1.87426 6.40805 1.66428 6.19635L0.42442 4.94625C-0.3055 4.2103 -0.0705252 3.46426 0.94936 3.29287L2.54418 3.02571C2.80915 2.98035 3.12912 2.74343 3.2491 2.49644L4.129 0.722089C4.60895 -0.240696 5.38885 -0.240696 5.8638 0.722089Z" />
                        </svg>
                    </span>
                )
            })}
        </div>
    )
}

