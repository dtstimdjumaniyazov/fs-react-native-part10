import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from './theme';
import useSignUp from '../hooks/useSignUp';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        padding: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5da',
        borderRadius: 4,
        padding: 12,
        marginBottom: 15,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
    },
    error: {
        color: '#d73a4a',
        marginTop: -10,
        marginBottom: 15,
    },
});

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(5, 'Username must be between 5 and 30 characters')
        .max(30, 'Username must be between 5 and 30 characters')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be between 5 and 50 characters')
        .max(50, 'Password must be between 5 and 50 characters')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Password confirmation is required'),
});

export const SignUpContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.error}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.error}>{formik.errors.password}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Password confirmation"
                secureTextEntry
                value={formik.values.passwordConfirmation}
                onChangeText={formik.handleChange('passwordConfirmation')}
                onBlur={formik.handleBlur('passwordConfirmation')}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={styles.error}>{formik.errors.passwordConfirmation}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text color="white" fontWeight="bold">Sign up</Text>
            </Pressable>
        </View>
    );
};

const SignUp = () => {
    const [signUp] = useSignUp();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signUp({ username, password });
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
