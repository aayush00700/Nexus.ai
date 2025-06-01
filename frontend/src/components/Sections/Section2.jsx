import React from "react";


const Section2 = () => {
    return(
        <section className="social-ready need-fide-in fade-in-animation" style={style.section2}>
            <p  className="section-title bg-section-title" style={style.heading1}>SOCIAL-READY CLIPS WITH AI</p>
            <h2  className="intro-h2 section-h2" style={style.heading2}>Turn long video into 30+ clips, in one click.</h2>
            <div  className="social-icons" style={style.iconList}>
                <div  className="social-icons-item" style={style.icon}>
                    <img style={style.iconImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAwCAMAAABdTmjTAAABC1BMVEUAAAD/KFj+LVUo9+8m9O4l9O7+LVX/LFX/MFgFAAH+LFb9LFX/LVUg/O//MFAl9O7+LFX+LFX+LFX9LFUm9e8n9O0l8+/cJkq7ID8HMTALTk0l9O4l9O4l9O//K1ocs64Zop8ScnAPYmB2FCdmEiIarqr+LVYCEhEAAAA25eEAAAAfy8bTJUcm8+4zCBIl9e39LFW/IkD9K1cl9OyNaHoFKyggt7MQgHgAAAAAAAAl9O7+LFXfJ0tACxUct7LeJ0sgBQsJPTyPGTAg1dAexsEQa2i+IUAQAwWfHDUFHx4j5N8SencHLi1vFCVfESAwCRACDw8UiYbuKlDOJEWuHjueHDV/FitPDhowCBH3ab3yAAAAOXRSTlMAIN8g379gQCDvr59QEBDv78+/gH9wQO/v79/PkDAw7+/v7+/v39/f38/Pv7+voJ+QgHBgYGBAIBBBGaQ5AAABnElEQVRIx83UZ1fCMBSA4UAHU6bg3nvvcXMtsgRxgdv//0tMuAWKLTX94vH9moecS04a9sdxSlPEJdlpJKWEQVbFkDq2MKmOoXEYAFuZABgezQAYVqIBMGycB8DQ2ikUNVUMnfuaroapqbypjgHxV9wMghtPI/FY4WBG12cd+AonnmJeeM7g3bZCThwys5OP1ld5GI9LWFqa2rQw7MQsZWZR5pjAkLQiwU8siibzidwA73F+dwPgjSnnDLUHUMOa2FdYNSwGviFYbTTefDBtXLK/T5k/LnBe6dlEhLGQHzZ4nYbFjKAiP6zTxLeIZH2xPcUrxpkK7tBKUgGnaWUS5/uXysboxjO0sjrAJ4TbHniWt0AUmzjuHbxO5/OJ6HpFi/QHobzbt73zCTNXxj10i51p4raOpzmvdX+MmHDjYgls/ZzWuajeoo09X1yjAnbTi/XawjJNJW+JR2Nr4Kp8jej9smjTXjbOvLvYHrZtYcMjX9vLfQdtfqCPlR29W82utKovwsZTzK9oAq9FKMtF/CRxM57N4HouH2H/uW/tX6kN/pGClwAAAABJRU5ErkJggg==" alt="index" loading="lazy" />
                </div>
                <div  className="social-icons-item" style={style.icon}>
                    <img style={style.iconImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="index" loading="lazy"/>
                </div>
                <div  className="social-icons-item" style={style.icon}>
                    <img style={style.iconImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHWSURBVHgB7ZiBbYMwEEX/CIxwIzCCR8gGZYNmA9gg2aDdgBEYISN0hI7Q4gYkc/HZxthAJT/JEtIlhzn7n30HFAqFQiED13H8rBgttnOz+P0eByGSHus+QiGeVvB5wQaqcXwh/AP0bwnreRf8dUhAjecymo4bPKOtppeYtgHruCDj5Ge4HnSkK8M+MPstzO3favHg6HFHBu6QJ2nbasrjj2Dfng9kopqcmy+7GvYa4dlD0lashoIhLJdcP9eGnW81SQ88ELtMfqaBWw889XI9JM/1MXA99IbNtj3mXN4iQ66PxacHvtWkyXc4CMJrClSGPeQq0uFgFNxC/IQ8+Sy5PoYOcuaR0mW2XB+LnrQ5wdaw2a4iCifDdxJzPTywTL2nQMGd211XkdNgi/SMbZXecEL4+WBGmvB6PhBOhFSYmJH2Xc0PQypM/oUeCPbCRIq072q+KwT5sHJFWv/vcD34ChNfpBscrIeQwkQ/u4ogvkof2Ik1hQkXOI/07npoYReqqzBxFUEE9yolZUsTaoAcad8qJWFrE4rgvplm1QMhTRNKwS36LHogpC1MOoufZhqd5T2b9JCrCTXAfXIn00OuJtTaznePCHI3oWqEf0AyPRQKhUJhwS9JbcyrJMwPlwAAAABJRU5ErkJggg==" alt="index" loading="lazy"/>
                </div>
                <div  className="social-icons-item" style={style.icon}>
                    <img style={style.iconImg} src="data:image/png;base64,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" alt="index" loading="lazy"/>
                </div>
                <div  className="social-icons-item" style={style.icon}>
                    <img style={style.iconImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL2SURBVHgB1Zi7bxNBEMa/PQf5QRELWgSmQYgCpQQKZNMjkh6EXQQhKGJEB5GSiEdtN4iYIhT8AZagocKCAsqDCqUA8yhBMgW2I2EvM3try4977F1yDvykk+52b28/z87Ozhj4xxCISOq6zFl9LPT6yAkLWW6TfbQSFpp9C3b3sWgiAqEEkYi8kLgkJRbpMRfwepO+3qBrI4w4I0FsDUhs0ZVHFASemgqzgl5ILssV9PE5shhGosjfSF2Ta0GvelooW5bZThtb9MIi9hAhUE+mUWpVRMu1Hx5idtp4JYEFxABNaiczKLiJmnMboC0TSkw2A5w/ARw9BMxnnLavP4EvI9cA/qE7HfJJYAnTYsfR67wOQ44dBmpFR4wX958DD15Mt9Pktzo1URltG3NqtZtCinm36i8mgDU9p7sgsmXgLhjl5W1nqaJCS5dV4cRNkI41RRhy+axjoV1D4eTgDTn017mRjlDWuXLOu+/1NvDhG9BqO89vtuFL748KLfakoDxCcPqIe7uXAwdwFdp31ZJpx8qZjuZt7eU7z94iCrmBcytBfGqHGZ1Nu7dPxpsw9LUGJYhTCOwzCb1CyocG+YwfvETz2jJ+u8utz8RqKgTA4+hw4+YFYPWi/zss5uPD6fYz94D332GEWjLO9BATv9pmYugYaQ0FUUoQmyBTy/Q4wxwIIo9qICY4QJpwYG5EEKeWEvFYySgMCDR/PxK2c6tJL8uKFFgxGO7pvDz5yTsID+Xc3U1R4tvh4SoTqGOfSCRQHdwPBdGyNVTZMmtozsFyjQnSnRuYNQKl0ccxQWwlKgSrmB1TtdpUXdZ5IspC5yZxQrHP7tbE+mS7a6EoLaoGhBMX4lGDJu3oJbcuV0HKjAKFOESxZfjbXmW1ZynNAyg2HN9LnyIxVapaC341fmBtzz5lYZdLyOHEQqGzKcpeJbSxIKZdE3W2Fn+UjhijAKqOIi2ExhZUnDMg8h9WUqrSJacvlVx9+oHWqbsq4bNTKdhB1vgv+AucD/o3W6DjSgAAAABJRU5ErkJggg==" alt="index" loading="lazy"/>
                </div>
                <div  className="social-icons-item" style={style.icon}>
                    <img style={style.iconImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAS1BMVEUAAAAKZsEKZ8IMaMMLZ8IKZsEKZsIKZsILZ8UMaMcMaL8LZcIKZsELZsIJZcIQcL8LZsINZsILZb8QcM8QYL8KZ8IKZsMLaMIKZsJwVILPAAAAGHRSTlMAgJ9Av6Dv3zAgIGDfz3AQkFAwEBCvf2BxonJDAAAA2UlEQVRIx+3Wyw6CMBCF4QMde+Wigtr3f1IDbaMhIc4QF2j4V+3iSzdDKWApiiIHOB2FaQuK4ghxQz+Dzqq3nZahgCmvJahGqpIgldEoQR45s+EkSE46ZxMEqBzljAjFu8PQmd2O0Vq6pWYFtVWK5vFI63paKgDoL/RxjBTmVGyuKD0aJmp6vPKahazHexcWWkZbUGCiIVTBITfykNXpcswZBiq3ry6IOKhefGw3DmpjqkPqxEExVx3oQP+ADKXMtKE6VVCb92aHP4CvIZIbgpU/Ej3gSWboiicg4LS+z5b5iAAAAABJRU5ErkJggg==" alt="index" loading="lazy"/>
                </div>
            </div>
            <div  className="social-body" style={style.socialBody}>
                <div style={style.scrollContainer}>
                    <div style={style.scrollTrack}>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>Course</p>
                            <video src= {import.meta.env.BASE_URL +"/eg2.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                            <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>TV Show</p>
                            <video src={import.meta.env.BASE_URL + "/eg3.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                            <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>News</p>
                            <video src={import.meta.env.BASE_URL + "/eg4.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                            <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>Course</p>
                            <video src={import.meta.env.BASE_URL + "/eg1.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                                <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>Interview</p>
                            <video src={import.meta.env.BASE_URL + "/eg6.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                                <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>TV Show</p>
                            <video src={import.meta.env.BASE_URL + "/eg3.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                            <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>News</p>
                            <video src={import.meta.env.BASE_URL + "/eg4.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                            <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>Course</p>
                            <video src={import.meta.env.BASE_URL + "/eg4.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                                <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>Interview</p>
                            <video src={import.meta.env.BASE_URL + "/eg6.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                                <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>Course</p>
                            <video src={import.meta.env.BASE_URL + "/eg2.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                            <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>TV Show</p>
                            <video src={import.meta.env.BASE_URL + "/eg3.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                            <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>News</p>
                            <video src={import.meta.env.BASE_URL + "/eg4.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                            <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>Course</p>
                            <video src={import.meta.env.BASE_URL + "/eg1.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                                <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                        <div  className="social-item" style={style.socialItem}>
                            <p  className="social-item-title" style={style.socialItemTitle}>Interview</p>
                            <video src={import.meta.env.BASE_URL + "/eg6.mp4"} style={style.ytVid} autoPlay muted loop playsInline></video>
                            <div  className="foot" style={style.socialItemFoot}>
                                <p  className="social-item-author" style={style.socialItemAuthor}>@GenfinityMedia</p>
                                <img style={style.ytImg} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZbvkYIwEMWfN/f96OBCB3ZwlkAJdHB2gB1gB7ZwHVDCaQXBCoIVrBtNRsU/M0ui+SC/mUeYMMN7LBsIMDKSmEl/ggDFQ4bTCHfe58td71i7G9c7J0vrxvXkNHdl/MsyLHqyNKvqm1cvMO6rPrwCV3KNNOQffCiQjsIG+EE6lA2QQYpSiMTAAJpbpqoQgW+4ZSHrYI/WRNNp0JIMC+BZrYiUGhzABAfw1ShLaQCDQaV7RF2L7hW3AkUhfpg4PbBcEmWZvJLBTdg0RLPZEOPAAMYQzechxl7NJ47/agUJec5/9Q4xsF/CLaREMmc2NsAa6WhTB/g7HLkZFhEaSqrFRRSeKFn/LzC2HqX3vbUrPt8RewGylXK+I7a0Tt3dXfHI27IH2XlHtDEftnwAAAAASUVORK5CYII=" alt="icon" loading="lazy" className="social-item-icon"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button style={style.getCLip}>Get Clips</button>
        </section>
    );
};

const style = {
    section2: {
        padding: '50px 0',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 228, 255, 0.97)', // Semi-transparent white background
    },
    getCLip: {
        backgroundColor: 'rgba(19, 25, 192, 0.85)', // Semi-transparent purple background
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '0.2rem',
        border: '1px solid rgba(255, 255, 255, 0.8)', // Semi-transparent border
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        width: '10%',
        height: '70%',
        fontfamily: 'roboto, sans-serif',
    },
    heading1: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'rgba(195, 48, 175, 0.8)', // Semi-transparent text color
        fontfamily: 'roboto, sans-serif',
    },
    heading2: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        marginTop: '0px',
        color: 'rgba(19, 24, 192, 0.8)', // Semi-transparent text color
        fontfamily: 'roboto, sans-serif',
    },
    iconList: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1.2rem',
        marginBottom: '1rem',
    },
    icon: {
        width: '3.8rem',
        height: '3.8rem',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    },
    iconImg: {
        width: '45%',
        height: '45%',
    },
    socialBody: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
        gap: '2rem',
    },
    socialItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '8rem',
        borderRadius: '10px',
        objectFit: 'cover',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        padding: '0rem 1rem',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        paddingBottom: '0.8rem 0.5rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    },
    socialItemBig: {
        display: 'flex',
        maxWidth: '300px',
        flexDirection: 'column',
        alignItems: 'center',
        width: '12.2rem',
        borderRadius: '10px',
        objectFit: 'cover',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        padding: '1rem',
        
    },
    socialItemTitle: {
        marginTop: '0px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: 'rgba(107, 6, 143, 0.8)', // Semi-transparent text color
        fontfamily: 'roboto, sans-serif',
        marginBottom: '0px',
    },
    socialItemFoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialItemAuthor: {
        marginTop: '0px',
        marginRight: '3px',
        fontSize: '0.7rem',
        color: 'rgba(19, 5, 5, 0.8)', // Semi-transparent text color
        justifyContent: 'left',
        marginBottom: '0.2rem',
    },
    ytImg :{
      width:'0.7rem'
    },
    getClipButton:{
      marginTop:'25px', 
      backgroundColor: 'rgba(19, 24, 192, 0.8)', // Semi-transparent purple background
      width: '40px',
      height: '40px',
    },
    ytVid:{
        width:'9rem',
        borderRadius: '4px',
    },
    scrollContainer:{
        overflow: 'hidden',
        whitespace: 'nowrap',
        position: 'relative'
    },
    scrollTrack: {
        height: '95%',
        display: "inline-flex",
        animation: "scroll-left 20s linear infinite",
        gap: "1.5rem",
    }
};

export default Section2;







