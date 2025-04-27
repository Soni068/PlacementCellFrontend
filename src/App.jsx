import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import PlacementHeader from './placement/PlacementHeader'
import HomePage from './components/HomePage'
import OurTeam from './components/OurTeam'
import StudentsHome from './components/StudentsHome'
import RecruitersHome from './components/RecruitersHome'
import Dashboard from './placement/Dashboard';
import Students from './placement/Students'
import Recruiters from './placement/Recruiters'
import ContactUs from './placement/ContactUs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentsList from './placement/StudentsList'
import StudentDashboard from './candidate/StudentDashboard'
import RequestedRecruiters from './placement/RequestedRecruiters'
import RecruitersList from './placement/RecruitersList'
import CompanyDashboard from './company/CompanyDashboard'
import AddDetails from './candidate/AddDetails'
import AddMarks from './candidate/AddMarks'
import UploadResume from './candidate/UploadResume'
import UploadCertificates from './candidate/UploadCertificates'
import StudentDetails from './placement/StudentDetails'
import SeeDetails from './candidate/SeeDetails'
import CandidateRecruiters from './candidate/CandidateRecruiters'
import CandidateContact from './candidate/CandidateContact'
import PostJobs from './company/PostJobs'
import PostedJobs from './company/PostedJobs'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import JobApplications from './candidate/JobApplications'
import JobDetails from './candidate/JobDetails'
import PostedJobsAdmin from './placement/PostedJobsAdmin'
import JobDetailsPage from './placement/JobDetailsPage'
import CompanyContact from './company/CompanyContact'
import Contact from './components/Contact'
import AdminSetting from './placement/AdminSetting'
import NotPlaced from './placement/NotPlaced'
import Placed from './placement/Placed'
import AdminProfile from './placement/AdminProfile'
import Profile from './candidate/Profile'
import TeamMember from './placement/TeamMember'
import ViewMembers from './placement/ViewMembers'
import AppliedCandidates from './company/AppliedCandidates'
import RecruiterDetails from './placement/RecruiterDetails'
import CompanyProfile from './company/CompanyProfile'
import Feedback from './placement/Feedback'
import CompanySetting from './company/CompanySetting'
import CompanyChangePassword from './company/CompanyChangePassword';
import StudentSetting from './candidate/StudentSetting'
import StudentChangePassword from './candidate/StudentChangePassword';




function App() {


  return (
    <>
    <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/OurTeam" element = {<OurTeam />}></Route>
            <Route path="/StudentsHome" element = {<StudentsHome />}></Route>
            <Route path="/RecruitersHome" element={<RecruitersHome />}></Route>
            <Route path="/Contact" element={<Contact />}></Route>
            <Route path="/OurTeam/placement/Dashboard" element={<Dashboard />}></Route> {/* Route for the dashboard */}
            <Route path="OurTeam/placement/AdminProfile" element={<AdminProfile />}></Route>
            <Route path="OurTeam/placement/Feedback" element={<Feedback />}></Route>
            <Route path="/placement/Students" element={<Students />}></Route>
            <Route path="/placement/Placed" element={<Placed />}></Route>
            <Route path="/placement/StudentsList" element={<StudentsList />}></Route>
            <Route path="/placement/NotPlaced" element={<NotPlaced />}></Route>
            <Route path="/studentDetails/:stud_id" element={<StudentDetails />} />
            <Route path="/placement/Recruiters" element={<Recruiters />}></Route>
            <Route path="/placement/AdminSetting" element={<AdminSetting />}></Route>
            {/*<Route path="/recruitersDetails/:name" element={<RecruitersDetails/>}></Route>*/}
            <Route path='/recruiterDetails/:name' element={<RecruiterDetails />}></Route>
            <Route path="/placement/RequestedRecruiters" element={<RequestedRecruiters />}></Route>
            <Route path="/placement/RecruitersList" element={<RecruitersList />}></Route>
            <Route path="/placement/ContactUs" element={<ContactUs />}></Route>
            <Route path="/placement/PostedJobsAdmin" element={<PostedJobsAdmin />}></Route>
            {/*<Route path="/placement/JobDetailsPage/:id" element={<JobDetailsPage />}></Route>*/}
            <Route path="/placement/JobDetailsPage/:jobId" element={<JobDetailsPage />}></Route>

            <Route path="placement/AdminSetting/TeamMembers" element={<TeamMember />}></Route>
            <Route path="placement/AdminSetting/ViewMembers" element={<ViewMembers />}></Route>
            <Route path="/StudentsHome/candidate/StudentDashboard" element={<StudentDashboard />}></Route>
            <Route path="/StudentsHome/candidate/Profile" element={<Profile />}></Route>
            <Route path="/candidate/AddDetails" element={<AddDetails />}></Route>
            <Route path="/candidate/Recruiters" element={<CandidateRecruiters />}></Route>
            <Route path="/candidate/ContactUs" element={<CandidateContact />}></Route>
            <Route path="/candidate/JobApplications" element={<JobApplications />}></Route>
            <Route path="/candidate/AddDetails/AddMarks" element={<AddMarks />}></Route>
            <Route path="/candidate/AddDetails/UploadResume" element={<UploadResume />}></Route>
            <Route path="candidate/AddDetails/UploadCertificates" element={<UploadCertificates />}></Route>
            <Route path="/candidate/AddDetails/SeeDetails" element={<SeeDetails />}></Route>
            <Route path="/jobDetails/:jobId" element={<JobDetails />}></Route>

            <Route path="/RecruitersHome/company/CompanyDashboard" element={<CompanyDashboard />}></Route>
            <Route path="/RecruitersHome/company/CompanyProfile" element={<CompanyProfile />}></Route>
            <Route path="/company/postjobs" element={<PostJobs />}></Route>
            <Route path="/company/postedjobs" element={<PostedJobs />}></Route>
            <Route path="/company/CompanyContact" element={<CompanyContact />}></Route>
            <Route path="/company/candidates/:jobId" element={<AppliedCandidates />}></Route>
            <Route path="/ForgotPassword/:userType" element={<ForgotPassword />}/>
            <Route path="/reset-password/:role" element={<ResetPassword />} />
            <Route path="/company/CompanySetting" element={<CompanySetting />}></Route>
            <Route path="/company/change-password" element={<CompanyChangePassword />} />
            <Route path="/candidate/StudentSetting" element={<StudentSetting />} />
            <Route path="/candidate/change-password" element={<StudentChangePassword />} />

            
          </Routes>
        
    </BrowserRouter>
    </>
  )
}

export default App
