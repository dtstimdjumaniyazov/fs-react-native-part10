import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from './theme';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
});

const initialValues = {
    username: '',
    password: ''
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(3)
        .required('Username is required'),
    password: yup
        .string()
        .min(3)
        .required("Password is required")
})

export const SignInContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text color="white" fontWeight="bold">Sign in</Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            console.log(data);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
