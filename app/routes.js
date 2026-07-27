const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/eligible-to-apply', function (req, res) {
  res.render('eligible-to-apply')
})

router.post('/eligible-to-apply', function (req, res) {
  const answer = req.session.data['eligible-to-apply']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'eligible-to-apply': 'Select yes if you are eligible to apply.' }
    return res.render('eligible-to-apply')
  }
  if (answer === 'yes') {
    return res.redirect('/applicant-type')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-eligible-to-apply')
  }
  res.redirect('/applicant-type')
})

router.get('/ineligible-eligible-to-apply', function (req, res) {
  res.render('ineligible-eligible-to-apply')
})

router.get('/applicant-type', function (req, res) {
  res.render('applicant-type')
})

router.post('/applicant-type', function (req, res) {
  const answer = req.session.data['applicant-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'applicant-type': 'Select what best describes you.' }
    return res.render('applicant-type')
  }
  if (answer === 'individual') {
    return res.redirect('/full-name')
  } else if (answer === 'organisation') {
    return res.redirect('/full-name')
  } else if (answer === 'none') {
    return res.redirect('/ineligible-applicant-type')
  }
  res.redirect('/full-name')
})

router.get('/ineligible-applicant-type', function (req, res) {
  res.render('ineligible-applicant-type')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter your full name.' }
    return res.render('full-name')
  }
  res.redirect('/contact-email')
})

router.get('/contact-email', function (req, res) {
  res.render('contact-email')
})

router.post('/contact-email', function (req, res) {
  const answer = req.session.data['contact-email']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-email': 'Enter your email address.' }
    return res.render('contact-email')
  }
  res.redirect('/additional-details')
})

router.get('/additional-details', function (req, res) {
  res.render('additional-details')
})

router.post('/additional-details', function (req, res) {
  const answer = req.session.data['additional-details']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'additional-details': 'Enter details about your situation.' }
    return res.render('additional-details')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('AS')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
