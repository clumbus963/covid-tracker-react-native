import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Item, Label } from 'native-base';
import { FormikProps } from 'formik';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CheckboxList, CheckboxItem } from '@covid/components/Checkbox';
import { ValidationError } from '@covid/components/ValidationError';
import { GenericTextField } from '@covid/components/GenericTextField';

import { FormikDiabetesInputFC } from './DiabetesQuestions';

export interface DiabetesOralMedsData {
  diabetesOralMeds: string[];
  diabetesOralOtherMedicationNotListed: boolean;
  diabetesOralOtherMedication?: string;
}

enum DiabetesOralMedsFieldnames {
  BIGUANIDE = 'diabetesOralBiguanide',
  SULFONYLUREA = 'diabetesOralSulfonylurea',
  DPP4 = 'diabetesOralDpp4',
  MEGLITINIDES = 'diabetesOralMeglitinides',
  THIAZOLIDNEDIONES = 'diabetesOralThiazolidinediones',
  OTHER_MED_NOT_LISTED = 'diabetesOralOtherMedicationNotListed',
}

enum DiabetesOralMedsDTOKeys {
  BIGUANIDE = 'diabetes_oral_biguanide',
  SULFONYLUREA = 'diabetes_oral_sulfonylurea',
  DPP4 = 'diabetes_oral_dpp4',
  MEGLITINIDES = 'diabetes_oral_meglitinides',
  THIAZOLIDNEDIONES = 'diabetes_oral_thiazolidinediones',
}

const getDiabetesOralMedsDTOKey = (key: string): DiabetesOralMedsDTOKeys | null => {
  switch (key) {
    case DiabetesOralMedsFieldnames.BIGUANIDE:
      return DiabetesOralMedsDTOKeys.BIGUANIDE;
    case DiabetesOralMedsFieldnames.SULFONYLUREA:
      return DiabetesOralMedsDTOKeys.SULFONYLUREA;
    case DiabetesOralMedsFieldnames.DPP4:
      return DiabetesOralMedsDTOKeys.DPP4;
    case DiabetesOralMedsFieldnames.MEGLITINIDES:
      return DiabetesOralMedsDTOKeys.MEGLITINIDES;
    case DiabetesOralMedsFieldnames.THIAZOLIDNEDIONES:
      return DiabetesOralMedsDTOKeys.THIAZOLIDNEDIONES;
    default:
      return null;
  }
};

type getDiabetesOralMedsMap = { [key in DiabetesOralMedsDTOKeys]: boolean };

const DIABETES_ORAL_MEDS_CHECKBOXES = [
  { fieldName: 'diabetesOralBiguanide', label: i18n.t('diabetes.answer-oral-biguanide'), value: false },
  { fieldName: 'diabetesOralSulfonylurea', label: i18n.t('diabetes.answer-sulfonylurea'), value: false },
  { fieldName: 'diabetesOralDpp4', label: i18n.t('diabetes.answer-dpp'), value: false },
  { fieldName: 'diabetesOralMeglitinides', label: i18n.t('diabetes.answer-meglitinides'), value: false },
  { fieldName: 'diabetesOralThiazolidinediones', label: i18n.t('diabetes.answer-thiazolidinediones'), value: false },
  { fieldName: 'diabetesOralSglt2', label: i18n.t('diabetes.answer-sglt'), value: false },
  {
    fieldName: 'diabetesOralOtherMedicationNotListed',
    label: i18n.t('diabetes.answer-other-oral-meds-not-listed'),
    value: false,
  },
];

interface Props {
  formikProps: FormikProps<DiabetesOralMedsData>;
}

type CheckboxType = {
  fieldName: string;
  label: string;
};

export const DiabetesOralMedsQuestion: FormikDiabetesInputFC<Props, DiabetesOralMedsData> = ({ formikProps }) => {
  const createDiabetesCheckboxes = (data: CheckboxType[], props: FormikProps<DiabetesOralMedsData>) => {
    return data.map((item) => {
      const isChecked = props.values.diabetesOralMeds.includes(item.fieldName);
      return (
        <CheckboxItem
          key={item.fieldName}
          value={isChecked}
          onChange={(checked: boolean) => {
            let result = props.values.diabetesOralMeds;
            if (checked) {
              result.push(item.fieldName);
            } else {
              result = result.filter((o) => o !== item.fieldName);
            }
            props.setFieldValue('diabetesOralMeds', result);
            props.setFieldValue(
              'diabetesOralOtherMedicationNotListed',
              result.includes('diabetesOralOtherMedicationNotListed')
            );
            // Clear provided text for other oral medication on Other unchecked
            if (item.fieldName === 'diabetesOralOtherMedicationNotListed' && !checked) {
              props.setFieldValue('diabetesOralOtherMedication', '');
            }
          }}>
          {item.label}
        </CheckboxItem>
      );
    });
  };

  return (
    <View>
      <Item stackedLabel style={styles.textItemStyle}>
        <Label>{i18n.t('diabetes.which-oral-treatment')}</Label>
        <CheckboxList>{createDiabetesCheckboxes(DIABETES_ORAL_MEDS_CHECKBOXES, formikProps)}</CheckboxList>
      </Item>
      {formikProps.values.diabetesOralOtherMedicationNotListed && (
        <GenericTextField formikProps={formikProps} name="diabetesOralOtherMedication" />
      )}
      <View style={{ marginHorizontal: 16 }}>
        {!!formikProps.errors.diabetesOralMeds && formikProps.submitCount > 0 && (
          <ValidationError error={formikProps.errors.diabetesOralMeds as string} />
        )}
        {!!formikProps.errors.diabetesOralOtherMedication && formikProps.submitCount > 0 && (
          <ValidationError error={formikProps.errors.diabetesOralOtherMedication as string} />
        )}
      </View>
    </View>
  );
};

DiabetesOralMedsQuestion.initialFormValues = (): DiabetesOralMedsData => {
  return {
    diabetesOralMeds: [],
    diabetesOralOtherMedicationNotListed: false,
  };
};

DiabetesOralMedsQuestion.schema = Yup.object().shape({
  diabetesOralMeds: Yup.array<string>().min(1),
  diabetesOralOtherMedication: Yup.string().when('diabetesOralOtherMedicationNotListed', {
    is: (val: boolean) => val,
    then: Yup.string().required(),
  }),
});

DiabetesOralMedsQuestion.createDTO = (data) => {
  const bools: getDiabetesOralMedsMap = {
    diabetes_oral_biguanide: false,
    diabetes_oral_sulfonylurea: false,
    diabetes_oral_dpp4: false,
    diabetes_oral_meglitinides: false,
    diabetes_oral_thiazolidinediones: false,
  };
  Object.entries(data.diabetesOralMeds).forEach((item) => {
    const key = getDiabetesOralMedsDTOKey(item[1]);
    if (key !== null) {
      bools[key] = true;
    }
  });
  return {
    diabetes_oral_other_medication: data.diabetesOralOtherMedication,
    ...bools,
  };
};

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});