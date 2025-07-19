import { initializeApp } from 'firebase/app';
import { config } from './config'
import { 
  collection, 
  collectionGroup, 
  doc, 
  getFirestore, 
  serverTimestamp, 
  writeBatch,
  query,
  where
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from "firebase/messaging";
import { getDatabase, ref as dbRef } from "firebase/database";
import { getStorage, ref } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
export const app = initializeApp(config);
export const firestoreDb = getFirestore(app);
export const auth = getAuth(app)
export const db = getDatabase(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const batch = writeBatch(firestoreDb);

// =============================================
// STANDARDIZED COLLECTION REFERENCES
// =============================================
// User Collections
export const usersRef = () => collection(firestoreDb, "users");
export const userRef = (id) => doc(firestoreDb, `users/${id}`);
export const userLogRef = (uid, id) => doc(firestoreDb, `users/${uid}/logs/${id}`);
export const userLogCollectionRef = (uid) => collection(firestoreDb, `users/${uid}/logs`);
export const usernameRef = (id) => doc(firestoreDb, `usernames/${id}`);
export const usernamesRef = () => collection(firestoreDb, `usernames`);
export const usermetadata = (id) => doc(firestoreDb, `metadata/userdata/users/${id}`);
export const usermetadataRef = () => collection(firestoreDb, `metadata/userdata/users`);
export const tokensRef = (id) => doc(firestoreDb, `tokens/${id}`);

// Student-specific access (uses users collection with role filter)
export const studentsRef = () => collection(firestoreDb, "users"); // Note: Filter by role in query
export const studentsBySection = (sectionId) => query(usersRef(), where('sectionId', '==', sectionId), where('role', '==', 'STUDENT'));

// Security and Auth
export const securityQuestionsCollectionRef = () => collection(firestoreDb, `securityQuestions`);
export const securityQuestionsRef = (uid) => doc(firestoreDb, `securityQuestions/${uid}`);
export const userSignupLogs = () => collection(firestoreDb, `userSignupLogs`);
export const userSignupLogsById = (id) => doc(firestoreDb, `userSignupLogs/${id}`);

// Application Status
export const appStatusDocRef = () => dbRef(db, 'appStatus/status');
export const todosRef = () => collection(firestoreDb, "todos");

// UI Components
export const carouselSettingsRef = () => doc(firestoreDb, 'settings/carousel');
export const carouselRef = () => collection(firestoreDb, "carousel");
export const carouselRefById = (id) => doc(firestoreDb, `carousel/${id}`);
export const carouselFilesUploadPath = (fileName) => ref(storage, `carousel/${fileName}`);

// Notifications
export const notificationsCollection = () => collection(firestoreDb, `notifications`);
export const notificationById = (id) => doc(firestoreDb, `notifications/${id}`);

// Events
export const eventsRef = () => collection(firestoreDb, "events");
export const eventRefById = (id) => doc(firestoreDb, `events/${id}`);

// Traffic and Analytics
export const dashboardDataRef = () => collection(firestoreDb, "dashboard");
export const pageViewsRef = () => collection(firestoreDb, "pageViews");
export const trafficRef = () => collection(firestoreDb, "traffic");
export const pageViewsRefByParameter = (date, parameter, pageId) => doc(firestoreDb, `traffic/${date}/${parameter}/${pageId}`);
export const trafficCollectionGroupRef = () => collectionGroup(firestoreDb, 'traffic');
export const pageViewsRefById = (id) => doc(firestoreDb, `pageViews/${id}`);
export const ipDataRef = (ip) => dbRef(db, `traffic/${ip}`);
export const ipDataCollectionRef = () => dbRef(db, `traffic`);
export const webAppTrafficCollectionRef = () => collection(firestoreDb, 'webapp');
export const webAppTrafficDocRef = (date) => doc(firestoreDb, `webapp/${date}`);
export const pageViewRef = (pageId, id) => doc(firestoreDb, `pages/${pageId}/views/${id}`);
export const pageViewRefById = (pageId) => doc(firestoreDb, `pages/${pageId}`);
export const pageView = () => collection(firestoreDb, `pages`);
export const historyCollection = () => collection(firestoreDb, 'history');
export const browserCollectionRef = () => collection(firestoreDb, 'browsers');
export const devicesCollectionRef = () => collection(firestoreDb, 'devices');
export const browserCollectionRefByAgent = (id) => doc(firestoreDb, `browsers/${id}`);
export const devicesCollectionRefByType = (id) => doc(firestoreDb, `devices/${id}`);

// Configuration
export const configRef = () => collection(firestoreDb, 'config');
export const configRefById = (id) => doc(firestoreDb, `config/${id}`);
export const routeConfigRef = () => collection(firestoreDb, `config/routeToPageId/routes`);
export const routeConfigRefById = (id) => doc(firestoreDb, `config/routeToPageId/routes/${id}`);

// File Storage
export const imageUploadPath = (uid, fileName) => ref(storage, `images/profile/${uid}/${fileName}`);
export const fileRef = (path) => ref(storage, path);
export const profileFilesUploadPath = (fileName) => ref(storage, `profile/${fileName}`);

// Chat and Messaging
export const groupChatCollection = () => collection(firestoreDb, 'groups');
export const chatProfileImageUploadPath = (fileName) => ref(storage, `images/chats/${fileName}`);
export const chatsImageUploadPath = (uid, fileName) => ref(storage, `chats/${uid}/files/${fileName}`);

// Tickets
export const ticketsCollection = () => collection(firestoreDb, 'tickets');
export const ticketById = (id) => doc(firestoreDb, `tickets/${id}`);

// Reviews and Testimonials
export const reviewCollection = () => collection(firestoreDb, 'reviews');
export const reviewById = (id) => doc(firestoreDb, `reviews/${id}`);
export const testimonialCollection = () => collection(firestoreDb, 'testimonials');
export const testimonialById = (id) => doc(firestoreDb, `testimonials/${id}`);

// Email
export const emailCollection = () => collection(firestoreDb, 'mail');
export const emailDocRef = (id) => doc(firestoreDb, `mail/${id}`);
export const emailCollectionRef = () => collection(firestoreDb, `mail`);
export const templatesColRef = () => collection(firestoreDb, 'templates');
export const templateDocRef = (id) => doc(firestoreDb, `templates/${id}`);
export const templateFiles = (id, filename) => ref(storage, `files/templates/${id}/${filename}`);

// Blogs
export const userDataUploadPath = (uid, filename) => ref(storage, `files/${uid}/${filename}`);
export const blogCollection = () => collection(firestoreDb, "blogs");
export const blogCollectionToReview = (id) => doc(firestoreDb, `review/${id}`);
export const blogDoc = (id) => doc(firestoreDb, `blogs/${id}`);
export const blogReviewDoc = (id) => doc(firestoreDb, `review/${id}`);
export const headerImageRef = (url) => ref(storage, `${url}`);
export const deletedBlogRef = () => collection(firestoreDb, "deletedBlogs");
export const commentsRef = (id) => collection(firestoreDb, `blogs/${id}/comments`);
export const commentsDocRef = (id, commentId) => doc(firestoreDb, `blogs/${id}/comments/${commentId}`);
export const replyCommentsRef = (postId, commentId) => doc(firestoreDb, `blogs/${postId}/comments/${commentId}`);
export const replyCommentsRefDoc = (postId, replyId) => doc(firestoreDb, `blogs/${postId}/comments/${replyId}`);
export const replyCommentsRefCol = (postId, replyId, replyParent) => collection(firestoreDb, `blogs/${postId}/comments/${replyParent}/${replyId}`);
export const categories = () => doc(firestoreDb, `config/categories`);
export const blogFilesUploadPath = (fileName) => ref(storage, `blogs/${fileName}`);

// Contact and Profile
export const contactUsCollection = () => collection(firestoreDb, 'contactUS');
export const educationCollection = () => collection(firestoreDb, 'education');
export const educationById = (id) => doc(firestoreDb, `education/${id}`);
export const projectsCollection = () => collection(firestoreDb, 'projects');
export const projectsById = (id) => doc(firestoreDb, `projects/${id}`);
export const experienceCollection = () => collection(firestoreDb, 'experiences');
export const experienceById = (id) => doc(firestoreDb, `experiences/${id}`);
export const certificationsCollection = () => collection(firestoreDb, 'certifications');
export const certificationsById = (id) => doc(firestoreDb, `certifications/${id}`);

// Academics
export const regulationsCollection = () => collection(firestoreDb, 'regulations');
export const regulationsById = (id) => doc(firestoreDb, `regulations/${id}`);
export const departmentsCollection = () => collection(firestoreDb, 'departments');
export const departmentById = (id) => doc(firestoreDb, `departments/${id}`);
export const subjectsCollection = () => collection(firestoreDb, 'subjects');
export const subjectById = (id) => doc(firestoreDb, `subjects/${id}`);
export const programLevelsCollection = () => collection(firestoreDb, 'program_levels');
export const programLevelById = (id) => doc(firestoreDb, `program_levels/${id}`);
export const programsCollection = () => collection(firestoreDb, 'programs');
export const programsById = (id) => doc(firestoreDb, `programs/${id}`);
export const specializationCollection = () => collection(firestoreDb, 'specializations');
export const specializationById = (id) => doc(firestoreDb, `specializations/${id}`);
export const semesterCollection = () => collection(firestoreDb, 'semesters');
export const semesterById = (id) => doc(firestoreDb, `semesters/${id}`);
export const subjectOfferingTypeCollection = () => collection(firestoreDb, 'subject_offering_types');
export const subjectOfferingTypeById = (id) => doc(firestoreDb, `subject_offering_types/${id}`);
export const subjectCategoryTypeCollection = () => collection(firestoreDb, 'subject_category_types');
export const subjectCategoryTypeById = (id) => doc(firestoreDb, `subject_category_types/${id}`);
export const instructionSchemesCollection = () => collection(firestoreDb, 'instruction_schemes');
export const instructionSchemesCollectionById = (id) => doc(firestoreDb, `instruction_schemes/${id}`);
export const instructionSchemeSubjectCollection = () => collection(firestoreDb, 'instruction_schemes_subjects');
export const instructionSchemeSubjectCollectionById = (id) => doc(firestoreDb, `instruction_schemes_subjects/${id}`);
export const syllabusCollection = () => collection(firestoreDb, `syllabus`);
export const syllabusById = (id) => doc(firestoreDb, `syllabus/${id}`);
export const subjectMetaCollection = () => collection(firestoreDb, `subject_meta`);
export const subjectMetaById = (id) => doc(firestoreDb, `subject_meta/${id}`);

// Exams
export const examsCollection = () => collection(firestoreDb, 'exams');
export const examsById = (id) => doc(firestoreDb, `exams/${id}`);
export const examsScheduleCollection = () => collection(firestoreDb, 'exam_schedules');
export const examsScheduleById = (id) => doc(firestoreDb, `exam_schedules/${id}`);
export const examCategoriesCollection = () => collection(firestoreDb, 'exam_categories');
export const examCategoriesById = (id) => doc(firestoreDb, `exam_categories/${id}`);
export const examRegistrationMarksCollection = () => collection(firestoreDb, 'exam_registration_marks');
export const examRegistrationMarksById = (id) => doc(firestoreDb, `exam_registration_marks/${id}`);
export const examStatsGradesCollection = () => collection(firestoreDb, `stats_grades`);
export const examStatsGradesById = (id) => doc(firestoreDb, `stats_grades/${id}`);
export const examStatsCGPAsCollection = () => collection(firestoreDb, `stats_gpas`);
export const examStatsCGPAsById = (id) => doc(firestoreDb, `stats_gpas/${id}`);

// Academic Classes
export const academicClassesCollection = () => collection(firestoreDb, 'academic_classes');
export const academicClassesById = (id) => doc(firestoreDb, `academic_classes/${id}`);
export const academicClassSectionCollection = () => collection(firestoreDb, 'academic_class_sections');
export const academicClassSectionById = (id) => doc(firestoreDb, `academic_class_sections/${id}`);
export const sectionRolesCollection = () => collection(firestoreDb, 'section_roles');
export const sectionRolesById = (id) => doc(firestoreDb, `section_roles/${id}`);

