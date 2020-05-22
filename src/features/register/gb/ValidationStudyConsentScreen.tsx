import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Body, CheckBox, ListItem } from 'native-base';
import React, { Component } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../../../../theme';
import { CheckboxItem, CheckboxList } from '../../../components/Checkbox';
import { BrandedButton, ClickableText, RegularBoldText, RegularText } from '../../../components/Text';
import UserService from '../../../core/user/UserService';
import { ScreenParamList } from '../../ScreenParamList';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigator from '../../Navigation';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'ValidationStudyConsent'>;
  route: RouteProp<ScreenParamList, 'ValidationStudyConsent'>;
};

interface TermsState {
  agreeToAbove: boolean;
  anonymizedData: boolean;
  reContacted: boolean;
}

export default class ValidationStudyConsentScreen extends Component<PropsType, TermsState> {
  private userService = new UserService();

  constructor(props: PropsType) {
    super(props);
    this.state = {
      agreeToAbove: false,
      anonymizedData: false,
      reContacted: false,
    };
  }

  viewOnly = this.props.route.params.viewOnly;

  handleAgreeToAboveChange = () => {
    this.setState({ agreeToAbove: !this.state.agreeToAbove });
  };
  handleAnonymizedChange = () => {
    this.setState({ anonymizedData: !this.state.anonymizedData });
  };
  handleReContactedChange = () => {
    this.setState({ reContacted: !this.state.reContacted });
  };

  handleAgreeClicked = async () => {
    if (this.state.agreeToAbove) {
      this.userService.setValidationStudyResponse(true, this.state.anonymizedData, this.state.reContacted).then((i) => {
        console.log(JSON.stringify(i.data));
      });
      Navigator.resetToProfileStartAssessment(this.props.route.params.currentPatient);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <SafeAreaView style={styles.mainContainer}>
          <ScrollView>
            <RegularBoldText>VALIDATION STUDY INFORMED CONSENT{'\n'}</RegularBoldText>

            <RegularBoldText>About this consent form{'\n'}</RegularBoldText>
            <RegularText>
              Please read this form carefully. It tells you important information about a research study.
              {'\n\n'}
              If you have any questions about the research or about this form, please ask. Taking part in this research
              study is up to you.
              {'\n'}
            </RegularText>

            <RegularBoldText>Invitation Paragraph{'\n'}</RegularBoldText>
            <RegularText>
              King’s College London would like to invite you to participate in this research study which forms part of
              Covid-19 research. Before you decide whether you want to take part, it is important for you to understand
              why the research is being done and what your participation will involve. Please take time to read the
              following information carefully and discuss it with others if you wish. Ask study researchers if there is
              anything that is not clear or if you would like more information.
              {'\n'}
            </RegularText>

            <RegularBoldText>What is the purpose of the study?{'\n'}</RegularBoldText>
            <RegularText>
              The purpose of the study is to test the level of accuracy of computer software (sometimes called
              algorithms or prediction models) that could be used as a “digital test” to evaluate whether an individual
              is infected with Covid-19 (SARS-CoV-2), based on their symptoms reported in the Covid Symptom Study app.
              This study is designed to establish how accurate this digital test is for different people. The potential
              benefit of a digital test is that it is simple to complete, it produces results quickly, and it can be
              accessed by a large proportion of the population, some of which have limited access to physical testing
              for Covid-19.
              {'\n\n'}
              Participants that develop new symptoms during the study may be asked to have a standard swab test for
              Covid-19, depending on test availability and your development of symptoms. The accuracy of the digital
              test will be evaluated by comparing its predictions with the results from an actual Covid-19 swab test.
              {'\n\n'}
              This study therefore aims to evaluate the use of this digital test as a diagnostic tool for Covid-19
              infection.
              {'\n'}
            </RegularText>

            <RegularBoldText>How long will I take part in this research study?{'\n'}</RegularBoldText>
            <RegularText>
              Your use of this mobile application is completely voluntary. You can use it as little or as much as you
              would like and can stop using it at any time. We find that answering the series of questions takes a
              matter of minutes (no more than 10 minutes on average).
              {'\n'}
            </RegularText>

            <RegularBoldText>Why have I been invited to take part?{'\n'}</RegularBoldText>

            <RegularText>
              You are being invited to participate in this study because you are already using the UK-version of the
              Covid-19 Symptom Study app to report your own health, are at least 18 years of age, have reported in the
              app that you live in the UK, and you have not reported testing positive from a previous Covid-19 test.
              {'\n'}
            </RegularText>

            <RegularBoldText>What will happen if I take part?{'\n'}</RegularBoldText>

            <RegularText>
              If you choose to take part in this study, you may be asked to have a Covid-19 swab test, and to report
              your test result in the app. If you are asked to be tested, it does not mean we think you have Covid-19.
              {'\n\n'}
              On behalf of King’s College London, Zoe Global Ltd (Zoe, the creator of the Covid-19 Symptom Study app)
              will oversee the arrangements for swab testing. You will receive instructions from Zoe in the app or by
              email, on how to organise your swab test, either by ordering a testing kit in the mail or visiting a
              Regional Testing Centre. Alternatively, Zoe may apply for testing on your behalf to the Department of
              Health and Social Care, through an online platform where Zoe will share your name, mobile phone number,
              and email address to register you for testing. Organising and completing the Covid-19 test is optional.
              Once you have received your test result, you will be asked to report it in the Covid-19 Symptom Study app.
              {'\n\n'}
              The researchers conducting this study have been granted the allowance to test up to 10,000 individuals per
              week in this way. This number of swab tests may be insufficient to test all the participants in this study
              who qualify for testing. Participants who are eligible for swab testing, but do not complete their test or
              do not report their test result, will receive feedback on the likelihood that they have SARS-CoV-2 based
              on their individual reported symptoms as predicted by the prediction model. These predictions will be
              communicated to the participant using the app on behalf of researchers at King’s College London.
              {'\n'}
            </RegularText>

            <RegularBoldText>What are the possible benefits from being in this research study?{'\n'}</RegularBoldText>
            <RegularText>
              There are no direct benefits to you for taking part in this study. Your participation may contribute more
              widely, with all the other participants to the advancement of research into the COVID virus.
              {'\n'}
            </RegularText>

            <RegularBoldText>Do I have to take part?{'\n'}</RegularBoldText>
            <RegularText>
              Participation is completely voluntary. You should only take part if you want to and choosing not to take
              part will not disadvantage you in anyway. You do not need to participate in this study in order to
              continue to use the app. Once you have read the information sheet, please contact us if you have any
              questions that will help you make a decision about taking part. If you decide to take part we would ask
              you to complete the consent form below and you will receive an electronic copy of this consent form to
              keep.
              {'\n'}
            </RegularText>

            <RegularBoldText>What are the possible risks of taking part?{'\n'}</RegularBoldText>

            <RegularText>
              There are no risks identified from taking part in this study.
              {'\n'}
            </RegularText>

            <RegularBoldText>What are the possible benefits of taking part?{'\n'}</RegularBoldText>

            <RegularText>
              By participating in this research, you will be contributing to the advancement of science and research on
              Covid-19. You will also receive your personal prediction of the likelihood that you are infected with
              SARS-CoV-2 based on your reported symptoms. This is provided for your interest. The prediction is not a
              clinical diagnostic tool, it has not been validated and you must not use it to make any health decisions.
              {'\n'}
            </RegularText>

            <RegularBoldText>Data handling and confidentiality{'\n'}</RegularBoldText>

            <RegularText>
              Your data will be processed in accordance with the General Data Protection Regulation 2016 (GDPR). As a
              user of the Covid-19 Symptom Study app, you have consented to Zoe’s terms including the{' '}
              <ClickableText
                onPress={() => this.props.navigation.navigate('PrivacyPolicyUK', { viewOnly: this.viewOnly })}>
                Privacy Policy
              </ClickableText>{' '}
              which is available from the app menu at all times. All these terms continue to apply to the present study.
              Your anonymised data may be shared with other members of the clinical or scientific community as outlined
              in the Privacy Policy, including international collaborators given the global nature of this research. No
              personal information about you will be shared by Zoe with King’s College London as a result of this
              research. Before sharing your data with King’s College London, an anonymous code will be used to replace
              your personal details (your name, email address and phone number if you have provided them) and your
              postcode will be replaced by a broader location identification.
              {'\n'}
            </RegularText>

            <RegularBoldText>What if I change my mind about taking part?{'\n'}</RegularBoldText>
            <RegularText>
              You are free to withdraw at any point from this study, without having to give a reason, up until 10th May
              2021. You can withdraw by contacting Zoe at{' '}
              <ClickableText onPress={() => this.openUrl('mailto:covidtrackingquestions@kcl.ac.uk')}>
                covidtrackingquestion@kcl.ac.uk
              </ClickableText>{' '}
              and quoting in the subject line: “Validation Study Withdrawal”.
              {'\n\n'}
              Withdrawing from the study will not affect you in any way and you can continue to take part in reporting
              in the Covid-19 app as you did before you joined this study. If you choose to withdraw from this study
              King’s College London will not retain the information you have given thus far for the purpose of this
              research, except when such data has already been included in aggregated analyses at the time of your
              withdrawal.
              {'\n'}
            </RegularText>

            <RegularBoldText>How is this study being funded?{'\n'}</RegularBoldText>
            <RegularText>
              This study is being funded by King’s College London and Zoe in order to help with the coronavirus
              pandemic.
              {'\n'}
            </RegularText>

            <RegularBoldText>What will happen to the results of this study?{'\n'}</RegularBoldText>
            <RegularText>
              The results of this study will be used for public health and academic research purposes, and may support
              future use of the digital test to diagnose Covid-19. The digital test will not be used to generate a
              profit for either King’s College London or Zoe. The results of this study may be published, for example in
              an academic journal.
              {'\n'}
            </RegularText>

            <RegularBoldText>Who should I contact for further information?{'\n'}</RegularBoldText>
            <RegularText>
              If you have any questions or require more information about this study, please contact the study staff
              using the following contact details that are dedicated to this study:
              {'\n'}
              <ClickableText onPress={() => this.openUrl('mailto:covidtrackingquestions@kcl.ac.uk')}>
                covidtrackingquestion@kcl.ac.uk
              </ClickableText>
              {'\n'}
            </RegularText>

            <RegularBoldText>What if I have further questions, or if something goes wrong?{'\n'}</RegularBoldText>
            <RegularText>
              If this research has harmed you in any way or if you wish to make a complaint about the conduct of the
              study you can contact King's College London using the details below for further advice and information:{' '}
              <ClickableText onPress={() => this.openUrl('mailto:covidtrackingquestions@kcl.ac.uk')}>
                covidtrackingquestion@kcl.ac.uk
              </ClickableText>
              {'\n'}
            </RegularText>

            <RegularBoldText>
              Thank you for reading this information sheet and for considering taking part in this research.{'\n'}
            </RegularBoldText>

            <RegularBoldText>Statement of consent:{'\n'}</RegularBoldText>
            <RegularText>
              - I confirm that I have read and understood the information sheet dated 07/05/20, version number 1.0, for
              the above project. I have had the opportunity to consider the information and asked questions which have
              been answered to my satisfaction.
              {'\n'}
            </RegularText>

            <RegularText>
              - I consent voluntarily to be a participant in this project and understand that I can refuse to take part
              and can withdraw from the project at any time, up until 10th May 2021, without having to give a reason. I
              understand that any information collected about me through this study will not be retained, except when
              already included in aggregated data analyses at the time of my withdrawal.{'\n'}
            </RegularText>

            <RegularText>
              - I consent to the processing of my personal information for the purposes explained to me in the
              Information Sheet. I understand that such information will be handled in accordance with the terms of the
              General Data Protection Regulation (GDPR) and the UK Data Protection Act 2018.
              {'\n'}
            </RegularText>

            <RegularText>
              - I understand that my information may be subject to review by responsible individuals from the College
              for monitoring and audit purposes.
              {'\n'}
            </RegularText>

            <RegularText>
              - I understand that confidentiality and anonymity will be maintained, and it will not be possible to
              identify me in any research outputs.
              {'\n'}
            </RegularText>

            <RegularText>
              - I consent to my anonymised data being shared with third parties which are within and outside the EU as
              outlined in the participant information sheet.
              {'\n'}
            </RegularText>

            <RegularText>
              - I understand that I must not take part if I fall under the exclusion criteria as detailed in the
              information sheet and explained to me by the researcher.
              {'\n'}
            </RegularText>

            {!this.viewOnly && (
              <CheckboxList>
                <CheckboxItem value={this.state.agreeToAbove} onChange={this.handleAgreeToAboveChange}>
                  I agree to the above.
                </CheckboxItem>
                <CheckboxItem value={this.state.anonymizedData} onChange={this.handleAnonymizedChange}>
                  I agree that the research team may use my anonymised data for future research (optional)
                </CheckboxItem>
                <CheckboxItem value={this.state.reContacted} onChange={this.handleReContactedChange}>
                  I agree to be re-contacted in the future by Zoe Global Ltd on behalf of King’s College London
                  researchers regarding this project (optional)
                </CheckboxItem>
              </CheckboxList>
            )}
          </ScrollView>

          {!this.viewOnly && (
            <BrandedButton
              style={styles.button}
              hideLoading
              enable={this.state.agreeToAbove}
              onPress={this.handleAgreeClicked}>
              Take part
            </BrandedButton>
          )}
        </SafeAreaView>
      </View>
    );
  }

  private openUrl(link: string) {
    Linking.openURL(link);
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundPrimary,
    marginHorizontal: 24,
    marginVertical: 24,
  },
  button: {
    marginTop: 20,
  },
});