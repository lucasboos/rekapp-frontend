function getTimestamps() {
    // Get the current date
    const now = new Date();

    // Set the time to the beginning of the day (midnight)
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startTimestamp = startOfDay.getTime();

    // Set the time to the end of the day (just before midnight)
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, -1);
    const endTimestamp = endOfDay.getTime();

    // Return the timestamps as an object
    return {
        start: startTimestamp,
        end: endTimestamp
    };
};
