/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    required
                    :error-messages="errors[codeFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    label="System name"
                    hint="System name must be unique"
                    @input="setCodeValue" />
                <CollectionTypesAutocomplete
                    :data-cy="dataCyGenerator(typeIdFieldKey)"
                    :value="type"
                    required
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[typeIdFieldKey]"
                    @input="setTypeValue" />
                <Divider v-if="extendedForm.length" />
                <template v-for="(field, index) in extendedForm">
                    <Component
                        :is="field.component"
                        :key="index"
                        v-bind="bindingProps(field)" />
                </template>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import CollectionTypesAutocomplete from '@Collections/components/Autocompletes/CollectionTypesAutocomplete';
import PRIVILEGES from '@Collections/config/privileges';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import TextField from '@UI/components/TextField/TextField';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CollectionForm',
    components: {
        CollectionTypesAutocomplete,
        Divider,
        Form,
        FormSection,
        TextField,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('collection', [
            'id',
            'code',
            'type',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Collections/components/Forms/CollectionForm',
                type: this.type,
            });
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.create,
            ]));
        },
        isDisabled() {
            return Boolean(this.id);
        },
        typeIdFieldKey() {
            return 'typeId';
        },
        typeFieldKey() {
            return 'type';
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('collection', [
            '__setState',
        ]),
        setCodeValue(value) {
            this.__setState({
                key: this.codeFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.codeFieldKey,
                value,
            });
        },
        setTypeValue(value) {
            this.__setState({
                key: this.typeFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.typeFieldKey,
                value,
            });
        },
        bindingProps({
            props,
        }) {
            return {
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.errors,
                disabled: !this.isAllowedToUpdate,
                ...props,
            };
        },
        dataCyGenerator(key) {
            return `collection-${key}`;
        },
    },
};
</script>
