
export const mapStateToProps = (state) => {
    return {
        token: state.token,
        texts: state.texts
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        login: (token) => {
            dispatch({
                type: "LOGIN",
                payload: token
            });
        },
        logout: () => {
            dispatch({
                type: "LOGOUT"
            });
        },
        add_text: (text) => {
            dispatch({
                type: "ADD_TEXT",
                payload: text
            })
        },
        reset_text: () => {
            dispatch({
                type: "RESET_TEXT"
            })
        }
    };
};
