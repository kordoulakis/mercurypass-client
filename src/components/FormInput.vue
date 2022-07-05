<template>
    <div class="FormInput" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
        <label :for="name">{{ label }}</label>
        <input :style="getHeight()" :name="name" :id="name" :type="type" :value="inputValue" :placeholder="placeholder"
            @input="handleChange" @blur="handleBlur" />
        <p class="help-message" v-show="errorMessage || meta.valid">
            {{ errorMessage || successMessage }}
        </p>
    </div>
</template>

<script>
import { toRef } from "vue";
import { useField } from "vee-validate";

export default {
    name: "FormInput",
    props: {
        type: {
            type: String,
            default: "text",
        },
        value: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        successMessage: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        height: Number
    },
    setup(props) {
        // use `toRef` to create reactive references to `name` prop which is passed to `useField`
        // this is important because vee-validte needs to know if the field name changes
        // https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
        const name = toRef(props, "name");
        const height = toRef(props, 'height')
        const {
            value: inputValue,
            errorMessage,
            handleBlur,
            handleChange,
            meta,
        } = useField(name, undefined, {
            initialValue: props.value,
        });
        return {
            handleChange,
            handleBlur,
            errorMessage,
            inputValue,
            meta,
        };
    },
    methods: {
        getHeight() {
            if (this.$props.height) {
                const heightString = this.$props.height.toString() + 'px'
                return { height: heightString }
            }

        }
    }
};

</script>

<style  scoped lang="scss">
$primary-color: #0071fe;
$error-color: #f23648;
$error-bg-color: #fddfe2;
$success-color: #21a67a;
$success-bg-color: #e0eee4;

.hasHeight {
    min-height: 100px;
}

.FormInput {
    position: relative;
    margin-bottom: calc(1em * 1.5);
    width: 100%;
    padding: 0;
}

label {
    display: flex;
    text-align: left;
    margin-bottom: 4px;
    width: 100%;
}

input {
    font-family: 'Raleway', sans-serif;
    border-radius: 5px;
    border: 2px solid transparent;
    padding: 15px 0px 15px 10px;
    outline: none;
    background-color: rgba(65, 105, 225, 0.096);

    max-width: 100%;
    min-width: 95%;


    transition: all 200ms ease;
    margin-bottom: 5px;

    box-sizing: border-box;
}


input:focus {
    border-color: $primary-color;
}

.help-message {
    position: absolute;
    bottom: calc(-1.5 * 1em);
    left: 0;
    margin: 0;
    font-size: 14px;
}

.FormInput.has-error input {
    background-color: $error-bg-color;
    color: $error-color;
}

.FormInput.has-error input:focus {
    border-color: $error-color;
}

.FormInput.has-error .help-message {
    color: $error-color;
}

.FormInput.success input {
    background-color: $success-bg-color;
    color: $success-color;
}

.FormInput.success input:focus {
    border-color: $success-color;
}

.FormInput.success .help-message {
    color: $success-color;
}
</style>