import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from './theme';
import useCreateReview from '../hooks/useCreateReview';

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
    multilineInput: {
        minHeight: 80,
        textAlignVertical: 'top',
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
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
};

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0, 'Rating must be between 0 and 100')
        .max(100, 'Rating must be between 0 and 100')
        .required('Rating is required'),
    text: yup
        .string(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Repository owner name"
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
                onBlur={formik.handleBlur('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={styles.error}>{formik.errors.ownerName}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Repository name"
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
                onBlur={formik.handleBlur('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={styles.error}>{formik.errors.repositoryName}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Rating between 0 and 100"
                keyboardType="numeric"
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
                onBlur={formik.handleBlur('rating')}
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={styles.error}>{formik.errors.rating}</Text>
            )}
            <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Review"
                multiline
                value={formik.values.text}
                onChangeText={formik.handleChange('text')}
                onBlur={formik.handleBlur('text')}
            />
            {formik.touched.text && formik.errors.text && (
                <Text style={styles.error}>{formik.errors.text}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text color="white" fontWeight="bold">Create a review</Text>
            </Pressable>
        </View>
    );
};

const ReviewForm = () => {
    const [createReview] = useCreateReview();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;

        try {
            const { data } = await createReview({
                ownerName,
                repositoryName,
                rating: Number(rating),
                text,
            });
            navigate(`/repository/${data.createReview.repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };

    return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
