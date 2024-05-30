const utcToLocalFormat = (UTCDateString) => {
    return new Date(UTCDateString).toLocaleString();
}

export default utcToLocalFormat;