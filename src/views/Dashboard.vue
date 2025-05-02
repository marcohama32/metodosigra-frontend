<template>
  <div class="commercial">
    <h1 class="text-center mb-8">Stakeholder Management System</h1>
    
    <div class="container mx-auto px-4">
      <div class="d-flex flex-wrap justify-content-start gap-4">
        <div v-for="(item, index) in commercialMenu" 
             :key="index" 
             class="card mb-4" 
             :class="cardResponsiveClass">
          <div class="card-body text-center" @click="openModal(item.name)">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <div class="mb-3">
              <span v-for="(tag, tagIndex) in item.tags" 
                    :key="tagIndex"
                    class="badge bg-success me-1">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Scope Modal -->
    <div class="modal" v-if="showModal && selectedCard === 'PROJECT SCOPE'">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Project Scope Definition</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label class="form-label">Project Goals</label>
                <textarea 
                  v-model="formData.goals" 
                  class="form-control" 
                  rows="3"
                  placeholder="Define the main goals of the project"
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Deadline</label>
                <input 
                  type="date" 
                  v-model="formData.deadline" 
                  class="form-control"
                >
              </div>

              <div class="mb-3">
                <label class="form-label">Rough Timeline</label>
                <textarea 
                  v-model="formData.timeline" 
                  class="form-control" 
                  rows="3"
                  placeholder="Outline the project timeline phases"
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Project Deliverables</label>
                <textarea 
                  v-model="formData.deliverables" 
                  class="form-control" 
                  rows="3"
                  placeholder="List the key deliverables"
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Team Members Involved</label>
                <textarea 
                  v-model="formData.teamMembers" 
                  class="form-control" 
                  rows="3"
                  placeholder="List team members and their roles"
                ></textarea>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Stakeholder Impact Modal -->
    <div class="modal" v-if="showModal && selectedCard === 'STAKEHOLDER IMPACT'">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Stakeholder Impact Assessment</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitStakeholderImpactForm">
              <div class="mb-3">
                <label class="form-label">Impact Dimension</label>
                <select v-model="stakeholderImpactForm.impactDimension" class="form-control">
                  <option value="">Select Impact Dimension</option>
                  <option value="economic">Economic</option>
                  <option value="social">Social</option>
                  <option value="environmental">Environmental</option>
                  <option value="technological">Technological</option>
                  <option value="legal">Legal/Regulatory</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">What (Impact Description)</label>
                <textarea 
                  v-model="stakeholderImpactForm.what" 
                  class="form-control" 
                  rows="3"
                  placeholder="Describe the specific impact"
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Who (Affected Stakeholders)</label>
                <textarea 
                  v-model="stakeholderImpactForm.who" 
                  class="form-control" 
                  rows="3"
                  placeholder="List the stakeholders affected by this impact"
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">How Much (Impact Magnitude)</label>
                <select v-model="stakeholderImpactForm.howMuch" class="form-control">
                  <option value="">Select Impact Magnitude</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Contribution</label>
                <textarea 
                  v-model="stakeholderImpactForm.contribution" 
                  class="form-control" 
                  rows="3"
                  placeholder="Describe how this impact contributes to the project"
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Risk Assessment</label>
                <div class="risk-assessment">
                  <div class="risk-level">
                    <label>Risk Level:</label>
                    <select v-model="stakeholderImpactForm.riskLevel" class="form-control">
                      <option value="">Select Risk Level</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div class="risk-description mt-2">
                    <label>Risk Description:</label>
                    <textarea 
                      v-model="stakeholderImpactForm.riskDescription" 
                      class="form-control" 
                      rows="2"
                      placeholder="Describe potential risks and mitigation strategies"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">Save Impact Assessment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Stakeholder Analysis Modal -->
    <div class="modal" v-if="showModal && selectedCard === 'DETAILED STAKEHOLDER ANALYSIS'">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detailed Stakeholder Analysis</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitDetailedAnalysisForm">
              <!-- Basic Stakeholder Information -->
              <div class="mb-3">
                <label class="form-label">Who (Stakeholder Name/Group)</label>
                <input 
                  type="text" 
                  v-model="detailedAnalysisForm.stakeholderName" 
                  class="form-control"
                  placeholder="Enter stakeholder name or group"
                >
              </div>

              <!-- Demographic Information Section -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Demographic Information</h6>
                
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Age Range</label>
                    <select v-model="detailedAnalysisForm.demographics.age" class="form-control">
                      <option value="">Select Age Range</option>
                      <option value="18-24">18-24</option>
                      <option value="25-34">25-34</option>
                      <option value="35-44">35-44</option>
                      <option value="45-54">45-54</option>
                      <option value="55+">55+</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Gender</label>
                    <select v-model="detailedAnalysisForm.demographics.gender" class="form-control">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Family Status</label>
                    <input 
                      type="text" 
                      v-model="detailedAnalysisForm.demographics.familyStatus" 
                      class="form-control"
                      placeholder="Family status"
                    >
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Residence</label>
                    <input 
                      type="text" 
                      v-model="detailedAnalysisForm.demographics.residence" 
                      class="form-control"
                      placeholder="Location/Residence"
                    >
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Nationality</label>
                    <input 
                      type="text" 
                      v-model="detailedAnalysisForm.demographics.nationality" 
                      class="form-control"
                      placeholder="Nationality"
                    >
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Income Level</label>
                    <select v-model="detailedAnalysisForm.demographics.income" class="form-control">
                      <option value="">Select Income Level</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Occupation</label>
                    <input 
                      type="text" 
                      v-model="detailedAnalysisForm.demographics.occupation" 
                      class="form-control"
                      placeholder="Current occupation"
                    >
                  </div>
                </div>
              </div>

              <!-- Stakeholder Analysis Section -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Stakeholder Analysis</h6>
                
                <div class="mb-3">
                  <label class="form-label">How to Reach Them</label>
                  <textarea 
                    v-model="detailedAnalysisForm.howToReach" 
                    class="form-control" 
                    rows="2"
                    placeholder="Preferred communication channels and methods"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label class="form-label">Their Interest</label>
                  <textarea 
                    v-model="detailedAnalysisForm.interest" 
                    class="form-control" 
                    rows="2"
                    placeholder="Stakeholder's interests in the project"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label class="form-label">Their Level of Impact</label>
                  <select v-model="detailedAnalysisForm.levelOfImpact" class="form-control">
                    <option value="">Select Impact Level</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">Their Level of Influence</label>
                  <select v-model="detailedAnalysisForm.levelOfInfluence" class="form-control">
                    <option value="">Select Influence Level</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">Their Primary Need</label>
                  <textarea 
                    v-model="detailedAnalysisForm.primaryNeed" 
                    class="form-control" 
                    rows="2"
                    placeholder="Primary needs and expectations"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label class="form-label">Other Relevant Information</label>
                  <textarea 
                    v-model="detailedAnalysisForm.other" 
                    class="form-control" 
                    rows="2"
                    placeholder="Any other relevant information about the stakeholder"
                  ></textarea>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">Save Analysis</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Stakeholders for Targeted Engagement Modal -->
    <div class="modal" v-if="showModal && selectedCard === 'STAKEHOLDERS FOR TARGETED ENGAG'">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Stakeholders for Targeted Engagement</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitTargetedEngagementForm">
              <!-- Immediate Proximity Section -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Immediate Proximity Stakeholders</h6>
                <div class="mb-3">
                  <label class="form-label">Nearby Residents/Businesses</label>
                  <textarea 
                    v-model="targetedEngagementForm.immediateProximity.nearby" 
                    class="form-control" 
                    rows="2"
                    placeholder="List stakeholders in immediate vicinity"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Local Community Groups</label>
                  <textarea 
                    v-model="targetedEngagementForm.immediateProximity.localCommunity" 
                    class="form-control" 
                    rows="2"
                    placeholder="Identify relevant local community groups"
                  ></textarea>
                </div>
              </div>

              <!-- Government & Infrastructure Section -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Government & Infrastructure</h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Urban Planning Department</label>
                    <textarea 
                      v-model="targetedEngagementForm.government.urbanPlanning" 
                      class="form-control" 
                      rows="2"
                      placeholder="Urban planning contacts and requirements"
                    ></textarea>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Sustainability Department</label>
                    <textarea 
                      v-model="targetedEngagementForm.government.sustainability" 
                      class="form-control" 
                      rows="2"
                      placeholder="Sustainability department contacts"
                    ></textarea>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Transport Authority</label>
                    <textarea 
                      v-model="targetedEngagementForm.government.transport" 
                      class="form-control" 
                      rows="2"
                      placeholder="Transport authority contacts"
                    ></textarea>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Local Bus Services</label>
                    <textarea 
                      v-model="targetedEngagementForm.government.localBus" 
                      class="form-control" 
                      rows="2"
                      placeholder="Local bus service stakeholders"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Support Services Section -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Support Services</h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Contract Services</label>
                    <textarea 
                      v-model="targetedEngagementForm.support.contract" 
                      class="form-control" 
                      rows="2"
                      placeholder="List relevant contract services"
                    ></textarea>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Trade Services</label>
                    <textarea 
                      v-model="targetedEngagementForm.support.trade" 
                      class="form-control" 
                      rows="2"
                      placeholder="List trade service providers"
                    ></textarea>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Landscape Services</label>
                    <textarea 
                      v-model="targetedEngagementForm.support.landscape" 
                      class="form-control" 
                      rows="2"
                      placeholder="Landscape service providers"
                    ></textarea>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Consultants</label>
                    <textarea 
                      v-model="targetedEngagementForm.support.consultants" 
                      class="form-control" 
                      rows="2"
                      placeholder="List relevant consultants"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Media Section -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Media Stakeholders</h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Local Media</label>
                    <textarea 
                      v-model="targetedEngagementForm.media.local" 
                      class="form-control" 
                      rows="2"
                      placeholder="Local media contacts"
                    ></textarea>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Industry Media</label>
                    <textarea 
                      v-model="targetedEngagementForm.media.industry" 
                      class="form-control" 
                      rows="2"
                      placeholder="Industry media contacts"
                    ></textarea>
                  </div>
                  <div class="col-md-12">
                    <label class="form-label">Media Influencers</label>
                    <textarea 
                      v-model="targetedEngagementForm.media.influencers" 
                      class="form-control" 
                      rows="2"
                      placeholder="Relevant media influencers"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Financial Section -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Financial Stakeholders</h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Project Investors</label>
                    <textarea 
                      v-model="targetedEngagementForm.financial.investors" 
                      class="form-control" 
                      rows="2"
                      placeholder="List project investors"
                    ></textarea>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Banking Partners</label>
                    <textarea 
                      v-model="targetedEngagementForm.financial.banking" 
                      class="form-control" 
                      rows="2"
                      placeholder="List banking partners"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">Save Targeted Engagement</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Communication Strategy Modal -->
    <div class="modal" v-if="showModal && selectedCard === 'COMMUNICATION STRATEGY'">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Communication Strategy Planning</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitCommunicationStrategyForm">
              <!-- Strategy Overview -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Strategy Overview</h6>
                <div class="mb-3">
                  <label class="form-label">Communication Objectives</label>
                  <textarea 
                    v-model="communicationStrategyForm.objectives" 
                    class="form-control" 
                    rows="3"
                    placeholder="What are the main objectives of your communication strategy?"
                  ></textarea>
                </div>
              </div>

              <!-- Target Audience & Message -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Target Audience & Key Messages</h6>
                <div class="mb-3">
                  <button type="button" class="btn btn-outline-primary mb-3" @click="addMessageMapping">
                    Add New Message Mapping
                  </button>
                  
                  <div v-for="(mapping, index) in communicationStrategyForm.messageMappings" 
                       :key="index" 
                       class="message-mapping-card mb-3 p-3 border rounded">
                    <div class="d-flex justify-content-end mb-2">
                      <button type="button" 
                              class="btn btn-sm btn-outline-danger"
                              @click="removeMessageMapping(index)">
                        Remove
                      </button>
                    </div>
                    
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="form-label">Target Audience</label>
                        <textarea 
                          v-model="mapping.targetAudience" 
                          class="form-control"
                          rows="2"
                          placeholder="Who is the target audience?"
                        ></textarea>
                      </div>
                      
                      <div class="col-md-6">
                        <label class="form-label">Key Message</label>
                        <textarea 
                          v-model="mapping.keyMessage" 
                          class="form-control"
                          rows="2"
                          placeholder="What is the key message for this audience?"
                        ></textarea>
                      </div>
                      
                      <div class="col-md-6">
                        <label class="form-label">Communication Channel</label>
                        <select v-model="mapping.channel" class="form-control">
                          <option value="">Select Channel</option>
                          <option value="email">Email</option>
                          <option value="meeting">In-person Meeting</option>
                          <option value="presentation">Presentation</option>
                          <option value="newsletter">Newsletter</option>
                          <option value="social_media">Social Media</option>
                          <option value="website">Website</option>
                          <option value="press_release">Press Release</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div class="col-md-6">
                        <label class="form-label">Frequency</label>
                        <select v-model="mapping.frequency" class="form-control">
                          <option value="">Select Frequency</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Bi-weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="as_needed">As Needed</option>
                        </select>
                      </div>
                      
                      <div class="col-12">
                        <label class="form-label">Expected Outcome</label>
                        <textarea 
                          v-model="mapping.expectedOutcome" 
                          class="form-control"
                          rows="2"
                          placeholder="What is the expected outcome of this communication?"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Timeline & Milestones -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Timeline & Milestones</h6>
                <div class="mb-3">
                  <label class="form-label">Key Communication Milestones</label>
                  <textarea 
                    v-model="communicationStrategyForm.milestones" 
                    class="form-control" 
                    rows="3"
                    placeholder="List key communication milestones and their target dates"
                  ></textarea>
                </div>
              </div>

              <!-- Success Metrics -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Success Metrics</h6>
                <div class="mb-3">
                  <label class="form-label">Key Performance Indicators (KPIs)</label>
                  <textarea 
                    v-model="communicationStrategyForm.kpis" 
                    class="form-control" 
                    rows="3"
                    placeholder="How will you measure the success of your communication strategy?"
                  ></textarea>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">Save Communication Strategy</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Engagement Activities Modal -->
    <div class="modal" v-if="showModal && selectedCard === 'ENGAGEMENT ACTIVITIES'">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Engagement Activities Planning</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitEngagementActivitiesForm">
              <!-- Activity Overview -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Activity Details</h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Activity Name</label>
                    <input 
                      type="text" 
                      v-model="engagementActivitiesForm.activityName" 
                      class="form-control"
                      placeholder="Enter activity name"
                    >
                  </div>
                  
                  <div class="col-md-6">
                    <label class="form-label">Activity Type</label>
                    <select v-model="engagementActivitiesForm.activityType" class="form-control">
                      <option value="">Select Activity Type</option>
                      <option value="meeting">Meeting</option>
                      <option value="workshop">Workshop</option>
                      <option value="presentation">Presentation</option>
                      <option value="survey">Survey</option>
                      <option value="focus_group">Focus Group</option>
                      <option value="public_event">Public Event</option>
                      <option value="consultation">Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Date</label>
                    <input 
                      type="date" 
                      v-model="engagementActivitiesForm.date" 
                      class="form-control"
                    >
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Duration</label>
                    <input 
                      type="text" 
                      v-model="engagementActivitiesForm.duration" 
                      class="form-control"
                      placeholder="e.g., 2 hours"
                    >
                  </div>
                </div>
              </div>

              <!-- Stakeholder Information -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Stakeholder Information</h6>
                <div class="mb-3">
                  <label class="form-label">Target Stakeholders</label>
                  <textarea 
                    v-model="engagementActivitiesForm.targetStakeholders" 
                    class="form-control" 
                    rows="2"
                    placeholder="List the stakeholders who will be involved"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label class="form-label">Expected Number of Participants</label>
                  <input 
                    type="number" 
                    v-model="engagementActivitiesForm.expectedParticipants" 
                    class="form-control"
                    placeholder="Enter expected number of participants"
                  >
                </div>
              </div>

              <!-- Activity Details -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Activity Planning</h6>
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label">Objectives</label>
                    <textarea 
                      v-model="engagementActivitiesForm.objectives" 
                      class="form-control" 
                      rows="2"
                      placeholder="What are the objectives of this engagement activity?"
                    ></textarea>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Agenda/Key Topics</label>
                    <textarea 
                      v-model="engagementActivitiesForm.agenda" 
                      class="form-control" 
                      rows="3"
                      placeholder="List the main agenda items or topics to be covered"
                    ></textarea>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Required Resources</label>
                    <textarea 
                      v-model="engagementActivitiesForm.resources" 
                      class="form-control" 
                      rows="2"
                      placeholder="List required materials, equipment, etc."
                    ></textarea>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Location/Platform</label>
                    <textarea 
                      v-model="engagementActivitiesForm.location" 
                      class="form-control" 
                      rows="2"
                      placeholder="Specify venue or online platform details"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Follow-up Planning -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Follow-up & Documentation</h6>
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label">Expected Outcomes</label>
                    <textarea 
                      v-model="engagementActivitiesForm.expectedOutcomes" 
                      class="form-control" 
                      rows="2"
                      placeholder="What outcomes do you expect from this activity?"
                    ></textarea>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Documentation Method</label>
                    <textarea 
                      v-model="engagementActivitiesForm.documentationMethod" 
                      class="form-control" 
                      rows="2"
                      placeholder="How will you document this activity? (e.g., minutes, recordings, photos)"
                    ></textarea>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Follow-up Actions</label>
                    <textarea 
                      v-model="engagementActivitiesForm.followupActions" 
                      class="form-control" 
                      rows="2"
                      placeholder="What follow-up actions will be needed?"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">Save Engagement Activity</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedback Integration Modal -->
    <div class="modal" v-if="showModal && selectedCard === 'FEEDBACK INTEGRATION'">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Feedback Integration</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitFeedbackIntegrationForm">
              <!-- Feedback Source -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Feedback Source</h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Stakeholder Group</label>
                    <select v-model="feedbackIntegrationForm.stakeholderGroup" class="form-control">
                      <option value="">Select Stakeholder Group</option>
                      <option value="community">Community Members</option>
                      <option value="government">Government Officials</option>
                      <option value="business">Business Partners</option>
                      <option value="employees">Employees</option>
                      <option value="media">Media Representatives</option>
                      <option value="investors">Investors</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Feedback Channel</label>
                    <select v-model="feedbackIntegrationForm.channel" class="form-control">
                      <option value="">Select Channel</option>
                      <option value="meeting">Meeting</option>
                      <option value="survey">Survey</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="social_media">Social Media</option>
                      <option value="website">Website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Date Received</label>
                    <input 
                      type="date" 
                      v-model="feedbackIntegrationForm.dateReceived" 
                      class="form-control"
                    >
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Priority Level</label>
                    <select v-model="feedbackIntegrationForm.priority" class="form-control">
                      <option value="">Select Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Feedback Content -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Feedback Content</h6>
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label">Feedback Summary</label>
                    <textarea 
                      v-model="feedbackIntegrationForm.summary" 
                      class="form-control" 
                      rows="3"
                      placeholder="Provide a brief summary of the feedback received"
                    ></textarea>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Key Issues/Concerns</label>
                    <textarea 
                      v-model="feedbackIntegrationForm.issues" 
                      class="form-control" 
                      rows="3"
                      placeholder="List main issues or concerns raised"
                    ></textarea>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Suggestions/Recommendations</label>
                    <textarea 
                      v-model="feedbackIntegrationForm.suggestions" 
                      class="form-control" 
                      rows="3"
                      placeholder="List any suggestions or recommendations provided"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Analysis & Integration -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Analysis & Integration</h6>
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label">Impact Assessment</label>
                    <textarea 
                      v-model="feedbackIntegrationForm.impact" 
                      class="form-control" 
                      rows="2"
                      placeholder="Assess the potential impact of this feedback on the project"
                    ></textarea>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Required Changes</label>
                    <textarea 
                      v-model="feedbackIntegrationForm.requiredChanges" 
                      class="form-control" 
                      rows="2"
                      placeholder="What changes are needed to address this feedback?"
                    ></textarea>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Resource Requirements</label>
                    <textarea 
                      v-model="feedbackIntegrationForm.resources" 
                      class="form-control" 
                      rows="2"
                      placeholder="What resources are needed to implement changes?"
                    ></textarea>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Timeline for Implementation</label>
                    <textarea 
                      v-model="feedbackIntegrationForm.timeline" 
                      class="form-control" 
                      rows="2"
                      placeholder="Estimated timeline for implementing changes"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Follow-up Actions -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Follow-up Actions</h6>
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label">Action Items</label>
                    <textarea 
                      v-model="feedbackIntegrationForm.actionItems" 
                      class="form-control" 
                      rows="3"
                      placeholder="List specific actions to be taken"
                    ></textarea>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Responsible Team/Person</label>
                    <input 
                      type="text" 
                      v-model="feedbackIntegrationForm.responsible" 
                      class="form-control"
                      placeholder="Who will be responsible for implementation?"
                    >
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Status</label>
                    <select v-model="feedbackIntegrationForm.status" class="form-control">
                      <option value="">Select Status</option>
                      <option value="pending">Pending Review</option>
                      <option value="in_progress">In Progress</option>
                      <option value="implemented">Implemented</option>
                      <option value="deferred">Deferred</option>
                      <option value="rejected">Not Feasible</option>
                    </select>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Response to Stakeholder</label>
                    <textarea 
                      v-model="feedbackIntegrationForm.response" 
                      class="form-control" 
                      rows="2"
                      placeholder="How will you respond to the stakeholder about their feedback?"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">Save Feedback Integration</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: 'Commercial',
data() {
  return {
      showModal: false,
      selectedCard: null,
      formData: {
        goals: '',
        deadline: '',
        timeline: '',
        deliverables: '',
        teamMembers: ''
      },
      stakeholderImpactForm: {
        impactDimension: '',
        what: '',
        who: '',
        howMuch: '',
        contribution: '',
        riskLevel: '',
        riskDescription: ''
      },
      detailedAnalysisForm: {
        stakeholderName: '',
        demographics: {
          age: '',
          gender: '',
          familyStatus: '',
          residence: '',
          nationality: '',
          income: '',
          occupation: ''
        },
        howToReach: '',
        interest: '',
        levelOfImpact: '',
        levelOfInfluence: '',
        primaryNeed: '',
        other: ''
      },
      targetedEngagementForm: {
        immediateProximity: {
          nearby: '',
          localCommunity: ''
        },
        government: {
          urbanPlanning: '',
          sustainability: '',
          transport: '',
          localBus: ''
        },
        support: {
          contract: '',
          trade: '',
          landscape: '',
          consultants: ''
        },
        media: {
          local: '',
          industry: '',
          influencers: ''
        },
        financial: {
          investors: '',
          banking: ''
        }
      },
      communicationStrategyForm: {
        objectives: '',
        messageMappings: [
          {
            targetAudience: '',
            keyMessage: '',
            channel: '',
            frequency: '',
            expectedOutcome: ''
          }
        ],
        milestones: '',
        kpis: ''
      },
      engagementActivitiesForm: {
        activityName: '',
        activityType: '',
        date: '',
        duration: '',
        targetStakeholders: '',
        expectedParticipants: '',
        objectives: '',
        agenda: '',
        resources: '',
        location: '',
        expectedOutcomes: '',
        documentationMethod: '',
        followupActions: ''
      },
      feedbackIntegrationForm: {
        stakeholderGroup: '',
        channel: '',
        dateReceived: '',
        priority: '',
        summary: '',
        issues: '',
        suggestions: '',
        impact: '',
        requiredChanges: '',
        resources: '',
        timeline: '',
        actionItems: '',
        responsible: '',
        status: '',
        response: ''
      },
    commercialMenu: [
      {
          name: 'PROJECT SCOPE',
          description: 'Define and document the project scope and objectives',
          link: '/stakeholder/project-scope',
          tags: ['Scope', 'Objectives']
        },
        {
          name: 'STAKEHOLDER IMPACT',
          description: 'Assess potential impacts on different stakeholder groups',
          link: '/stakeholder/impact',
          tags: ['Impact', 'Assessment']
        },
        {
          name: 'DETAILED STAKEHOLDER ANALYSIS',
          description: 'Comprehensive analysis of stakeholder interests and influence',
          link: '/stakeholder/detailed-analysis',
          tags: ['Analysis', 'Details']
        },
        {
          name: 'STAKEHOLDERS FOR TARGETED ENGAG',
          description: 'Identify key stakeholders for targeted engagement',
          link: '/stakeholder/targeted-engagement',
          tags: ['Targeting', 'Engagement']
        },
        {
          name: 'COMMUNICATION STRATEGY',
          description: 'Develop effective communication strategies',
          link: '/stakeholder/communication',
          tags: ['Communication', 'Strategy']
        },
        {
          name: 'ENGAGEMENT ACTIVITIES',
          description: 'Plan and track stakeholder engagement activities',
          link: '/stakeholder/activities',
          tags: ['Activities', 'Planning']
        },
        {
          name: 'FEEDBACK INTEGRATION',
          description: 'Integrate and manage stakeholder feedback',
          link: '/stakeholder/feedback',
          tags: ['Feedback', 'Integration']
        }
      ]
    }
  },
  computed: {
    cardResponsiveClass() {
      return {
        'w-100': window.innerWidth < 576, // Full width on mobile
        'w-50': window.innerWidth >= 576 && window.innerWidth < 768, // 2 cards per row on small devices
        'w-33': window.innerWidth >= 768 && window.innerWidth < 992, // 3 cards per row on medium devices
        'w-25': window.innerWidth >= 992 // 4 cards per row on large devices
      }
    }
  },
  methods: {
    openModal(cardName) {
      this.selectedCard = cardName;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedCard = null;
    },
    submitForm() {
      // Here you can handle the form submission
      console.log('Form data:', this.formData);
      // Add your API call or data processing logic here
      this.closeModal();
    },
    submitStakeholderImpactForm() {
      console.log('Stakeholder Impact Form data:', this.stakeholderImpactForm);
      // Add your API call or data processing logic here
      this.closeModal();
    },
    submitDetailedAnalysisForm() {
      console.log('Detailed Stakeholder Analysis Form data:', this.detailedAnalysisForm);
      // Add your API call or data processing logic here
      this.closeModal();
    },
    submitTargetedEngagementForm() {
      console.log('Targeted Engagement Form data:', this.targetedEngagementForm);
      // Add your API call or data processing logic here
      this.closeModal();
    },
    submitCommunicationStrategyForm() {
      console.log('Communication Strategy Form data:', this.communicationStrategyForm);
      // Add your API call or data processing logic here
      this.closeModal();
    },
    submitEngagementActivitiesForm() {
      console.log('Engagement Activities Form data:', this.engagementActivitiesForm);
      // Add your API call or data processing logic here
      this.closeModal();
    },
    submitFeedbackIntegrationForm() {
      console.log('Feedback Integration Form data:', this.feedbackIntegrationForm);
      // Add your API call or data processing logic here
      this.closeModal();
    },
    addMessageMapping() {
      this.communicationStrategyForm.messageMappings.push({
        targetAudience: '',
        keyMessage: '',
        channel: '',
        frequency: '',
        expectedOutcome: ''
      });
    },
    removeMessageMapping(index) {
      this.communicationStrategyForm.messageMappings.splice(index, 1);
    }
}
}
</script>

<style scoped>
.commercial {
padding: 2rem;
background-color: #f8f9fa;
}

.card {
transition: transform 0.3s ease;
border-radius: 10px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 200px;
}

.card:hover {
transform: translateY(-5px);
  background-color: #e9ecef;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 0.9rem;
  color: #6c757d;
}

.badge {
  font-size: 0.75rem;
}

.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.modal-dialog {
  margin: 1.75rem auto;
  max-width: 800px;
  width: 95%;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.btn-close:hover {
  opacity: 0.75;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.risk-assessment {
  border: 1px solid #dee2e6;
  padding: 1rem;
  border-radius: 0.25rem;
}

.risk-level {
  margin-bottom: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.analysis-section {
  border: 1px solid #dee2e6;
  padding: 1.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #495057;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
}

.col-md-6 {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 0.5rem;
}

.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 0.5rem;
}

.g-3 {
  gap: 1rem;
}

.message-mapping-card {
  background-color: #f8f9fa;
}

.message-mapping-card:hover {
  background-color: #e9ecef;
}

/* Responsive classes for cards */
.w-100 {
  width: 100% !important;
}

.w-50 {
  width: calc(50% - 1rem) !important;
}

.w-33 {
  width: calc(33.333% - 1rem) !important;
}

.w-25 {
  width: calc(25% - 1rem) !important;
}

/* Responsive modal */
.modal-dialog {
  margin: 1.75rem auto;
  max-width: 800px;
  width: 95%;
}

@media (max-width: 576px) {
  .modal-dialog {
    margin: 1rem auto;
    width: 95%;
  }

  .modal-body {
    padding: 0.75rem;
  }

  .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .row {
    margin-right: -0.25rem;
    margin-left: -0.25rem;
  }

  .g-3 {
    gap: 0.5rem;
  }

  .form-control {
    font-size: 14px;
  }

  .card {
    margin-bottom: 1rem;
  }

  .card-body {
    padding: 1rem;
  }

  .commercial {
    padding: 1rem;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .modal-dialog {
    width: 90%;
  }

  .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  .modal-dialog {
    width: 85%;
  }
}

/* Ajustes para formulários em telas pequenas */
@media (max-width: 768px) {
  .analysis-section {
    padding: 1rem;
  }

  .message-mapping-card {
    padding: 0.75rem;
  }

  .form-label {
    font-size: 0.9rem;
  }

  .btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.9rem;
  }

  h1 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-text {
    font-size: 0.85rem;
  }

  .badge {
    font-size: 0.7rem;
  }
}

/* Ajustes para melhor visualização em dispositivos móveis */
@media (max-width: 576px) {
  .modal-title {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .btn-close {
    font-size: 1.2rem;
  }

  textarea.form-control {
    min-height: 60px;
  }

  .analysis-section {
    margin-bottom: 1rem;
  }
}

/* Ajuste para scroll em modais longos em dispositivos móveis */
@media (max-height: 800px) {
  .modal-body {
    max-height: 70vh;
    overflow-y: auto;
  }
}
</style>


