import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { string, object } from 'yup'

import Header from './header'

import { validUS5DigitsZipCodeRegExp } from '../../constants'
import store from '../../store'
import { api } from '../../utils/api'
import useDeviceInfo from '../../hooks/useDeviceInfo'

const initialValues = {
  name: '',
  email: '',
  age: '',
  gender: '',
  zip: '',
  reason_for_purchase: ''
}

const ageGroupOtptions = [
  { value: '', label: 'Select Age group' },
  { value: '18-25', label: '18-25' },
  { value: '26-35', label: '26-35' },
  { value: '36-45', label: '36-45' },
  { value: '46+', label: '46+' }
]

const genderOtptions = [
  { value: '', label: 'Select Gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other / Prefer not to say' }
]

const reasonOtptions = [
  { value: 'work productivity', label: 'Work productivity' },
  { value: 'sports performance', label: 'Sports performance' },
  { value: 'study aid', label: 'Study aid' },
  { value: 'general energy boost', label: 'General energy boost' }
]

const validationSchema = object().shape({
  name: string().required('Required'),
  age: string().required('Required'),
  gender: string().required('Required'),
  email: string().email('Please enter valid email').required('Required'),
  reason_for_purchase: string().required('Required'),
  zip: string().required('Required').matches(validUS5DigitsZipCodeRegExp, 'Please enter a valid 5 digit zip code')
})

export default function Home() {
  const navigate = useNavigate()

  const deviceInfo = useDeviceInfo()

  const setDiscountPercentage = store((state) => state.setDiscountPercentage)
  const setUserBasicDetails = store((state) => state.setUserBasicDetails)

  const handleSubmit = (values: any) => {
    api
      .post('/api/calculate-discount', { ageRange: values.age, zipCode: values.zip, deviceType: deviceInfo.deviceType, deviceAge: deviceInfo.deviceAge })
      .then((response) => {
        setUserBasicDetails({
          name: values.name,
          email: values.email
        })
        setDiscountPercentage(Number(response.data.discount))

        navigate('/checkout')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="container-fluid">
        <Header />
        <main className="main-container container px-4 px-md-3">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} validateOnChange={false}>
            {({ values, errors, touched, setFieldValue, isSubmitting }) => {
              return (
                <Form>
                  <fieldset className="form-group row">
                    <legend className="col-form-legend col-sm-12 pb-2">Tell us little about yourself</legend>
                    <Field name="name">
                      {({ field }) => (
                        <div className="col-sm-12 pb-2">
                          <div className="col-form-label">Full Name</div>
                          <input name="name" className="form-control" type="text" placeholder="eg. Abhishek Bijalwan" {...field} />
                          <ErrorMessage name="name" render={(msg) => <div className="red font-small">{msg}</div>} />
                        </div>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field }) => (
                        <div className="col-sm-12 pb-2">
                          <div className="col-form-label">Your Email</div>
                          <input name="email" className="form-control" type="text" placeholder="eg. abhishek.bijalwan092@gmail.com" {...field} />
                          <ErrorMessage name="email" render={(msg) => <div className="red font-small">{msg}</div>} />
                        </div>
                      )}
                    </Field>
                    <Field name="zip">
                      {({ field }) => (
                        <div className="col-sm-12 pb-2">
                          <div className="col-form-label">Your Zip Code</div>
                          <input name="zip" className="form-control" type="text" pattern="\d*" maxLength={5} placeholder="eg. 10001" {...field} />
                          <ErrorMessage name="zip" render={(msg) => <div className="red font-small">{msg}</div>} />
                        </div>
                      )}
                    </Field>
                    <Field name="age">
                      {({ field }) => (
                        <div className="col-sm-12 pb-2">
                          <label htmlFor="age" className="col-form-label" id="number-label">
                            Your Age
                          </label>
                          <select className="form-control" name="age" placeholder="" {...field}>
                            {ageGroupOtptions.map((option) => (
                              <option key={option.label} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ErrorMessage name="age" render={(msg) => <div className="red font-small">{msg}</div>} />
                        </div>
                      )}
                    </Field>
                    <Field name="gender">
                      {({ field }) => (
                        <div className="col-sm-12 pb-2">
                          <label htmlFor="age" className="col-form-label" id="number-label">
                            Your Gender
                          </label>
                          <select className="form-control" name="gender" placeholder="" {...field}>
                            {genderOtptions.map((option) => (
                              <option key={option.label} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ErrorMessage name="gender" render={(msg) => <div className="red font-small">{msg}</div>} />
                        </div>
                      )}
                    </Field>
                  </fieldset>
                  <fieldset className="form-group row">
                    <legend className="col-form-legend col-sm-12 pb-2">Little bit more details</legend>
                    <div className="col-sm-12 pb-2">
                      <p className="check-heading">Reason for purchase</p>
                      {reasonOtptions.map((option) => (
                        <div className="form-check" key={option.label}>
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={option.value}
                              id={option.value}
                              value={option.value}
                              checked={values.reason_for_purchase === option.value}
                              onChange={() => setFieldValue('reason_for_purchase', option.value === values.reason_for_purchase ? '' : option.value)}
                            />
                            <span className="form-check-mark"></span>
                            {option.label}
                          </label>
                        </div>
                      ))}
                      {errors?.reason_for_purchase && touched.reason_for_purchase ? <div className="red font-small">{errors.reason_for_purchase}</div> : null}
                    </div>
                    <div className="col-sm-12 pb-2">
                      <label htmlFor="suggestion"></label>
                      <textarea className="form-control" name="suggestion" id="suggestion" rows={3} placeholder="Want to add more details? Add them here..."></textarea>
                    </div>
                  </fieldset>
                  <fieldset className="form-group row">
                    <div className="col-sm-12 pb-2">
                      <button type="submit" className="btn btn-primary" id="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </div>
                  </fieldset>
                </Form>
              )
            }}
          </Formik>
        </main>
      </div>
    </>
  )
}
