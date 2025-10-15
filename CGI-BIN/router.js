(function () {
  const contentSection = document.getElementById('contentSection');
  if (!contentSection) {
    return;
  }

  const originalContent = contentSection.innerHTML;
  const routeHandlers = new Map();
  const scrollContainer = document.querySelector('.content-wrapper') || contentSection;

  function normalizePath(path) {
    if (!path) {
      return '/';
    }
    let normalized = path.trim();
    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.replace(/\/+$/, '');
      if (normalized === '') {
        normalized = '/';
      }
    }
    return normalized;
  }

  function setContent(html) {
    contentSection.innerHTML = html;
    enhanceRouteLinks(contentSection);
  }

  function enhanceRouteLinks(root = document) {
    root.querySelectorAll('[data-route]').forEach((anchor) => {
      if (anchor.dataset.routeBound === 'true') {
        return;
      }
      anchor.addEventListener('click', handleRouteClick);
      anchor.dataset.routeBound = 'true';
    });
  }

  function handleRouteClick(event) {
    const anchor = event.currentTarget;
    const path = anchor.getAttribute('data-route');
    if (!path) {
      return;
    }
    event.preventDefault();
    navigate(path);
  }

  function registerRoute(path, handler) {
    routeHandlers.set(normalizePath(path), handler);
  }

  function updateActiveLinks(path) {
    const normalizedPath = normalizePath(path);
    document.querySelectorAll('[data-route]').forEach((link) => {
      const linkPath = normalizePath(link.getAttribute('data-route'));
      const isExactMatch = linkPath === normalizedPath;
      const isParentMatch = linkPath !== '/' && normalizedPath.startsWith(`${linkPath}/`);
      if (isExactMatch || isParentMatch) {
        link.classList.add('active-route');
      } else {
        link.classList.remove('active-route');
      }
    });
  }

  function render(path, options = {}) {
    const normalizedPath = normalizePath(path);
    const handler = routeHandlers.get(normalizedPath) || routeHandlers.get('/');
    if (handler) {
      handler();
    }
    updateActiveLinks(normalizedPath);
    if (!options.skipScroll) {
      if (typeof scrollContainer.scrollIntoView === 'function') {
        scrollContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  function navigate(path, options = {}) {
    const normalizedPath = normalizePath(path);
    const shouldReplace = Boolean(options.replace);
    const historyMethod = shouldReplace ? 'replaceState' : 'pushState';
    const currentPath = normalizePath(window.location.pathname);

    if (currentPath !== normalizedPath || shouldReplace) {
      window.history[historyMethod]({}, '', normalizedPath);
    }

    render(normalizedPath, { skipScroll: options.skipScroll });
  }

  function renderMission() {
    setContent(`
            <h1>Mission Statement</h1>
            <p>Our mission is to provide assessments, counseling for individuals, couples, and groups, education, and community outreach to help individuals, family, and friends negatively impacted by gambling problems regardless of their ability to pay.</p>
            <hr class="section-line">
            <h2>Our Goals</h2>
            <ul style="margin-left: 40px;"> <!-- Styling similar to original content -->
                <li><p style="font-size: 20px; padding: 0 40px;">Provide evidence-based treatments to individuals, couples, family members, and their friends adversely affected by problem gambling.</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Educate individuals, families, community citizens, and healthcare providers about problem gambling, its consequences, and ways to reduce or prevent problem gambling.</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Conduct and disseminate research to create greater understanding about gambling disorder, its associated features, brain-behavior relationships, and science-based approaches to prevention and treatment.</p></li>
            </ul>
        `);
  }

  function renderContact() {
    setContent(`
        <h1>Contact Us</h1>
        <div class="contact-info" style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div style="width: 48%; text-align: left;">
                    <h2 style="font-size: 20px; margin-bottom: 10px;">Our Location</h2>
                    <p style="margin: 5px 0;">8565 S. Eastern Ave. Suite 178<br>Las Vegas, NV. 89123</p>
                    <p style="margin: 5px 0;">Tel: 702.827.9404<br>Fax: 702.935.7215</p>
                </div>
                <div style="width: 48%; text-align: left;">
                    <h2 style="font-size: 20px; margin-bottom: 10px;">Reception Hours</h2>
                    <p style="margin: 5px 0;">Monday - Friday 8:00a - 5:00p</p>
                    <h2 style="font-size: 20px; margin-bottom: 10px;">Therapy Hours</h2>
                    <p style="margin: 5px 0;">Monday - Friday by Appointment<br>Sunday by Appointment</p>
                </div>
        </div>
        <div class="contact-container">
            <div class="alert" style="background-color: #f8d7da; color: #721c24; padding: 10px; margin-bottom: 20px; border: 1px solid #f5c6cb; border-radius: 5px;">
                Please be aware that this is <strong>not</strong> an emergency contact form. If you are experiencing an emergency, please call 911 and/or proceed to your nearest emergency room. Alternatively, you can contact the 988 number which is a confidential, free hotline that connects those experiencing a mental health, substance use, or suicidal crisis with trained crisis counselors 24/7/365. Call, text, or visit the 988 helpline at <a href="https://988lifeline.org" target="_blank">988lifeline.org</a>
            </div>

            <form action="your-server-side-code" method="POST">
                <div style="display: flex; justify-content: space-between;">
                    <input type="text" name="firstname" placeholder="First Name" required style="width: 48%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;">
                    <input type="text" name="lastname" placeholder="Last Name" required style="width: 48%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;">
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <input type="text" name="phone" placeholder="Phone" required style="width: 48%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;">
                    <input type="text" name="email" placeholder="Email" required style="width: 48%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;">
                </div>
                <textarea name="message" placeholder="Message" rows="5" required style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;"></textarea>
                <div class="g-recaptcha" data-sitekey="your-site-key" style="margin: 10px 0;"></div>
                <button type="submit" style="width: 100%; padding: 10px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
            </form>

            <iframe style="width: 100%; border: none; margin-top: 20px;" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.4380698933064!2d-115.12266198836534!3d36.03401327236073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8cfb5231519cb%3A0x7c264ef27a35feaf!2s8565%20S%20Eastern%20Ave%2C%20Las%20Vegas%2C%20NV%2089123!5e0!3m2!1sen!2sus!4v1715922183920!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        `);
  }

  function renderArticlesOverview() {
    setContent(`
            <h1>Articles Related to Problem Gambling Issues</h1>
            <p>The following articles are intended to help provide insight, perspective, and strategies to address problem gambling behaviors or articles focused on loved ones and family members of those with a gambling addiction. In most cases, we have attempted to include articles that have been researched based on social science literature to provide accurate information to readers.</p>
            <p>Note: Article titles without a link are in process and will be posted in the near future.</p>
            <hr class="section-line">
            <ol style="margin-left: 40px;"> <!-- Styling similar to original content -->
                <li><p style="font-size: 20px; padding: 0 40px;">Understanding the Relationship between Shame and Problem Gambling</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Gambling Addiction and Suicide Risk</p></li>
                <li style="font-size: 20px; padding: 0 40px;"><a id="mindfulnessMeditationLink2" href="/Resources/MindfulnessMeditation" data-route="/Resources/MindfulnessMeditation">Mindfulness Meditation and Problem Gambling</a></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Problem Gambling Risk Factors and Vulnerable Populations</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Health and Wellness: Obesity, Exercise, Sleep Hygiene, and Nutrition</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Boredom and Problem Gambling</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Is There a Relationship between ADHD and Gambling Addiction?</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Characteristics of Gamblers who Focus on Sports Betting</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Seniors and Problem Gambling</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Gambling Related Irrational Thought Patterns</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">The Continuum of Gambling Behavior</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">The Effects of Problem Gambling on Families</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">The Role of Trauma and Gambling Addiction</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Cultivating Emotional Intelligence in Recovery Work</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">What Motivates Problem Gambling Behavior?</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Regaining a Perspective on Life through Value Clarification</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Using the Wheel of Life to Gain Balance</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">The Cost-Benefit Analysis of Gambling Addiction (SR)</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Understanding the Neuroscience of Gambling Addiction</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Avoiding the Trap of Negative Self Talk</p></li>
                <li><p style="font-size: 20px; padding: 0 40px;">Gambling Disorder and Crime</p></li>
            </ol>
        `);
  }

  function renderTreatmentOverview() {
    setContent(`
        <h1>Treatment Services</h1>
        <p>The Gambling Addiction Treatment Center provides evidence-based counseling, education, and recovery planning tailored to each client. Our team partners with individuals, couples, and families to build sustainable skills that reduce harm and promote long-term wellness.</p>
        <p>Explore the services below to learn how we can support you at every stage of recovery.</p>
        <hr class="section-line">
        <ul style="margin-left: 40px;">
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Treatment/FreeGamblingAssessment" data-route="/Treatment/FreeGamblingAssessment">Free Gambling Assessment</a></li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Treatment/ForGamblers" data-route="/Treatment/ForGamblers">For Gamblers</a></li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Treatment/ForFamilyAndLovedOnes" data-route="/Treatment/ForFamilyAndLovedOnes">For Family and Loved Ones</a></li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Treatment/TelehealthOptions" data-route="/Treatment/TelehealthOptions">Telehealth Options</a></li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Treatment/SelfHelpOptions" data-route="/Treatment/SelfHelpOptions">Self-Help Options</a></li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Treatment/SelfAssessmentQuestionnaire" data-route="/Treatment/SelfAssessmentQuestionnaire">Self-Assessment Questionnaire</a></li>
        </ul>
    `);
  }

  function renderFreeAssessment() {
    setContent(`
        <h1>Free Gambling Assessment</h1>
        <p>We offer complimentary clinical assessments to help you understand how gambling may be affecting your life. During the appointment, a counselor reviews your history, identifies strengths, and collaborates on a personalized care plan.</p>
        <p>Call <strong>(702) 827-9404</strong> to schedule an assessment or <a href="/ContactUs" data-route="/ContactUs">contact us online</a> to request an appointment.</p>
    `);
  }

  function renderForGamblers() {
    setContent(`
        <h1>Treatment for Gamblers</h1>
        <p>Therapy sessions focus on rebuilding control, understanding triggers, and applying practical tools that support recovery. We integrate cognitive-behavioral strategies, motivational interviewing, and mindfulness-based approaches that have demonstrated effectiveness for gambling disorder.</p>
        <p>Services are available in individual and group formats so you can receive support in the way that fits you best.</p>
    `);
  }

  function renderForFamilyAndLovedOnes() {
    setContent(`
        <h1>Support for Family and Loved Ones</h1>
        <p>Family members often experience stress, confusion, and financial strain alongside their loved one. We provide counseling and education that helps families set healthy boundaries, practice self-care, and participate in the recovery process in meaningful ways.</p>
        <p>Sessions can be scheduled with or without the gambler present depending on your needs.</p>
    `);
  }

  function renderTelehealthOptions() {
    setContent(`
        <h1>Telehealth Options</h1>
        <p>Virtual sessions connect you with licensed clinicians through secure video conferencing. Telehealth allows you to attend therapy from your home or office while still receiving the same compassionate care offered in person.</p>
        <p>Ask our reception team about telehealth availability when you schedule your next appointment.</p>
    `);
  }

  function renderSelfHelpOptions() {
    setContent(`
        <h1>Self-Help Options</h1>
        <p>Self-guided resources complement counseling by reinforcing recovery skills between sessions. We recommend combining the following tools with professional support for the best outcomes:</p>
        <ul style="margin-left: 40px;">
            <li style="font-size: 20px; padding: 0 40px;">Daily journaling to track urges, emotions, and wins in recovery.</li>
            <li style="font-size: 20px; padding: 0 40px;">Mindfulness and breathing exercises such as those in our <a href="/Resources/MindfulnessMeditation" data-route="/Resources/MindfulnessMeditation">Mindfulness Meditation</a> guide.</li>
            <li style="font-size: 20px; padding: 0 40px;">Peer support meetings in the community or online to stay accountable.</li>
        </ul>
    `);
  }

  function renderResourcesOverview() {
    setContent(`
        <h1>Resource Library</h1>
        <p>Browse articles, videos, and community programs that reinforce healthy habits, financial stability, and informed decision-making during recovery.</p>
        <hr class="section-line">
        <ul style="margin-left: 40px;">
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Resources/AudioAndVideoLibrary" data-route="/Resources/AudioAndVideoLibrary">Audio/Video Library</a></li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Resources/Articles" data-route="/Resources/Articles">Articles Related to Problem Gambling Issues</a></li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Resources/SuggestedReading" data-route="/Resources/SuggestedReading">Suggested Reading</a></li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Resources/Podcasts" data-route="/Resources/Podcasts">Podcasts</a></li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Resources/Weblinks" data-route="/Resources/Weblinks">Weblinks</a></li>
        </ul>
    `);
  }

  function renderWeblinks() {
    setContent(`
        <h1>Weblinks</h1>
        <p>Explore trusted partners and community programs that extend support beyond our clinic.</p>
        <ul style="margin-left: 40px;">
            <li style="font-size: 20px; padding: 0 40px;"><a href="https://www.nevadacouncil.org" target="_blank" rel="noopener">Nevada Council on Problem Gambling</a> &mdash; statewide education, helplines, and training opportunities.</li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="https://gaming.nv.gov/" target="_blank" rel="noopener">Nevada Gaming Control Board</a> &mdash; information about the state self-exclusion program and regulatory updates.</li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="https://ag.nv.gov/Hot_Topics/Issue/Problem_Gambling/" target="_blank" rel="noopener">Nevada Problem Gambling Treatment and Resource Centers</a> &mdash; statewide locations and funding information for treatment services.</li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="https://diversion.nvcourts.gov/" target="_blank" rel="noopener">Nevada Gambling Treatment Diversion Court</a> &mdash; specialty court program details and eligibility requirements.</li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="https://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/" target="_blank" rel="noopener">National Council on Problem Gambling Helpline</a> &mdash; 24/7 confidential help via call or text 1-800-522-4700.</li>
        </ul>
    `);
  }

  function renderSuggestedReadings() {
    setContent(`
        <h1>Suggested Reading</h1>
        <p>Recommended books and manuals provide practical guidance and personal stories that resonate with individuals in recovery.</p>
        <ul style="margin-left: 40px;">
            <li style="font-size: 20px; padding: 0 40px;">"Overcoming Problem Gambling" by Philip Mawer</li>
            <li style="font-size: 20px; padding: 0 40px;">"Mindfulness for Addictions" by Francesco Pagnini</li>
            <li style="font-size: 20px; padding: 0 40px;">"Addiction Recovery Skills" by Suzette Glasner</li>
        </ul>
        <p>Check with your local library or online retailers for availability.</p>
    `);
  }

  function renderFinancialResources() {
    setContent(`
        <h1>Financial Resources</h1>
        <p>Financial counseling and protective tools help repair the impact gambling can have on personal finances.</p>
        <ul style="margin-left: 40px;">
            <li style="font-size: 20px; padding: 0 40px;">Meet with a certified financial counselor to create a realistic repayment plan.</li>
            <li style="font-size: 20px; padding: 0 40px;">Use spending trackers and budgeting apps to monitor cash flow in real time.</li>
            <li style="font-size: 20px; padding: 0 40px;">Consider third-party money management agreements when accountability is needed.</li>
        </ul>
    `);
  }

  function renderMythsAndFacts() {
    setContent(`
        <h1>Myths and Facts about Gambling</h1>
        <p>Understanding the science of gambling helps dispel common misconceptions that keep people stuck in harmful patterns.</p>
        <ul style="margin-left: 40px;">
            <li style="font-size: 20px; padding: 0 40px;"><strong>Myth:</strong> "I’m due for a win." <strong>Fact:</strong> Games of chance are random, and previous outcomes do not influence future results.</li>
            <li style="font-size: 20px; padding: 0 40px;"><strong>Myth:</strong> "Gambling is a good way to solve money problems." <strong>Fact:</strong> Gambling typically creates additional debt and stress.</li>
            <li style="font-size: 20px; padding: 0 40px;"><strong>Myth:</strong> "I can quit anytime." <strong>Fact:</strong> Gambling disorder is recognized as an addiction and often requires structured support.</li>
        </ul>
    `);
  }

  function renderNevadaCouncil() {
    setContent(`
        <h1>Nevada Council on Problem Gambling</h1>
        <p>The Nevada Council on Problem Gambling provides statewide education, helplines, and referrals for individuals seeking help. Visit <a href="https://www.nevadacouncil.org" target="_blank" rel="noopener">nevadacouncil.org</a> for current programs and training opportunities.</p>
        <p>Our clinicians collaborate with the council to ensure Nevadans have access to comprehensive care.</p>
    `);
  }

  function renderSelfExclusion() {
    setContent(`
        <h1>Self-Exclusion</h1>
        <p>Self-exclusion programs allow individuals to voluntarily ban themselves from gambling establishments or online platforms. Enrollment helps reduce temptation while other recovery supports are put in place.</p>
        <p>Speak with your counselor or visit the Nevada Gaming Control Board to learn more about enrollment requirements.</p>
    `);
  }

  function renderDiversionCourt() {
    setContent(`
        <h1>Nevada Gambling Diversion Court</h1>
        <p>The diversion court connects eligible defendants with treatment instead of incarceration. Participants engage in therapy, monitoring, and restitution planning while addressing the underlying gambling disorder.</p>
        <p>Attorneys and court representatives can contact our office to discuss assessments or treatment coordination.</p>
    `);
  }

  function renderOurTeam() {
    setContent(`
        <h1>Our Team</h1>
        <p>The Gambling Addiction Treatment Center is staffed by licensed mental health professionals with decades of combined experience treating gambling disorder. Our clinicians integrate research-driven practices with compassionate care.</p>
        <p>We collaborate with psychiatrists, financial specialists, and recovery peers to ensure each client receives well-rounded support.</p>
    `);
  }

  function renderResearchOverview() {
    setContent(`
        <h1>Research Initiatives</h1>
        <p>Research informs every aspect of our treatment planning. We contribute to statewide studies, publish findings, and translate emerging evidence into practical tools for clients and providers.</p>
        <hr class="section-line">
        <ul style="margin-left: 40px;">
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Research/ArticlesAndPublications" data-route="/Research/ArticlesAndPublications">Articles and Publications</a></li>
            <li style="font-size: 20px; padding: 0 40px;"><a href="/Research/ResearchRounds" data-route="/Research/ResearchRounds">Research Rounds</a></li>
        </ul>
    `);
  }

  function renderNews() {
    setContent(`
        <h1>News and Updates</h1>
        <p>Check back soon for announcements about upcoming groups, community events, and newly published research. We regularly update this page with opportunities to stay engaged in recovery-focused education.</p>
    `);
  }

  function initializeQuestionnaire() {
    const form = contentSection.querySelector('#questionnaire');
    if (!form) {
      return;
    }
    const recommendation = contentSection.querySelector('#recommendation');
    const notSevere = contentSection.querySelector('#not-severe');
    const questions = form.querySelectorAll('.question');

    function checkCompletion() {
      let yesCount = 0;
      let allAnswered = true;

      questions.forEach((question) => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        let answered = false;

        inputs.forEach((input) => {
          if (input.checked) {
            answered = true;
            if (input.value === 'yes') {
              yesCount += 1;
            }
          }
        });

        if (!answered) {
          allAnswered = false;
        }
      });

      if (allAnswered) {
        if (yesCount > 5) {
          recommendation?.classList.remove('hidden');
          notSevere?.classList.add('hidden');
        } else {
          recommendation?.classList.add('hidden');
          notSevere?.classList.remove('hidden');
        }
      } else {
        recommendation?.classList.add('hidden');
        notSevere?.classList.add('hidden');
      }
    }

    form.addEventListener('change', checkCompletion);
  }

  function renderSelfAssessment() {
    setContent(`
        <h1>Problem Gambling Self-Assessment Questionnaire</h1>
        <p><strong>Instructions:</strong> Please respond to the following questions and carefully indicate "Yes" or "No" for each statement based on your experiences and behaviors over the past 12 months.</p>
        <hr class="section-line">
        <form id="questionnaire" style="padding: 0 40px;">
            <div class="question">
                <label>1. Have there ever been periods lasting 2 weeks or longer when you spent a lot of time thinking about your gambling experiences, planning future gambling ventures or bets, or thinking of ways to get money to gamble with?</label>
                <div class="options">
                    <label>Yes <input type="radio" name="q1" value="yes"></label>
                    <label>No <input type="radio" name="q1" value="no"></label>
                </div>
            </div>
            <div class="question">
                <label>2. Have there ever been periods lasting 2 weeks or longer when you needed to gamble with increased amounts of money or with larger bets than before in order to get the same feeling of excitement?</label>
                <div class="options">
                    <label>Yes <input type="radio" name="q2" value="yes"></label>
                    <label>No <input type="radio" name="q2" value="no"></label>
                </div>
            </div>
            <div class="question">
                <label>3. Have you ever felt restless or irritable when trying to stop, cut down, or control your gambling?</label>
                <div class="options">
                    <label>Yes <input type="radio" name="q3" value="yes"></label>
                    <label>No <input type="radio" name="q3" value="no"></label>
                </div>
            </div>
            <div class="question">
                <label>4. Have you made 3 or more unsuccessful attempts to control, cut-back on, or stop your gambling?</label>
                <div class="options">
                    <label>Yes <input type="radio" name="q4" value="yes"></label>
                    <label>No <input type="radio" name="q4" value="no"></label>
                </div>
            </div>
            <div class="question">
                <label>5. Have you ever gambled to escape from personal problems, or to relieve uncomfortable feelings such as guilt, anxiety, helplessness, depression, or boredom?</label>
                <div class="options">
                    <label>Yes <input type="radio" name="q5" value="yes"></label>
                    <label>No <input type="radio" name="q5" value="no"></label>
                </div>
            </div>
            <div class="question">
                <label>6. Has there ever been a period when, if you lost money gambling one day, you would often return another day to get even or recoup your losses (i.e., chasing your losses)?</label>
                <div class="options">
                    <label>Yes <input type="radio" name="q6" value="yes"></label>
                    <label>No <input type="radio" name="q6" value="no"></label>
                </div>
            </div>
            <div class="question">
                <label>7. Have you ever lied on 3 or more occasions to family members, counselors, friends, or others in order to hide the extent of your involvement with gambling (e.g., amount of money spent on gambling, amount of money lost on gambling, or how often you gamble)?</label>
                <div class="options">
                    <label>Yes <input type="radio" name="q7" value="yes"></label>
                    <label>No <input type="radio" name="q7" value="no"></label>
                </div>
            </div>
            <div class="question">
                <label>8. Has your gambling ever led you to lose, or placed you at risk of losing, a significant relationship, a job, an educational experience, or a career opportunity (e.g., caused serious or repeated problems in your relationships with family members, friends, your work, education, or career)?</label>
                <div class="options">
                    <label>Yes <input type="radio" name="q8" value="yes"></label>
                    <label>No <input type="radio" name="q8" value="no"></label>
                </div>
            </div>
            <div class="question">
                <label>9. Have you ever had to ask family members, friends, a lending institution, or other people to loan or provide you with money or bail you out of a desperate money situation largely caused by your gambling?</label>
                <div class="options">
                    <label>Yes <input type="radio" name="q9" value="yes"></label>
                    <label>No <input type="radio" name="q9" value="no"></label>
                </div>
            </div>
            <div id="recommendation" class="hidden">
                <p><strong>Recommendation:</strong> Based on your answers, it is recommended to seek help now.</p>
            </div>
            <div id="not-severe" class="hidden">
                <p><strong>Recommendation:</strong> Based on your answers, it appears you might not have a severe gambling problem, but if you have concerns, consider talking to a professional.</p>
            </div>
        </form>
        `);
    initializeQuestionnaire();
  }

  registerRoute('/', () => {
    setContent(originalContent);
  });
  registerRoute('/OurMission', renderMission);
  registerRoute('/OurTeam', renderOurTeam);
  registerRoute('/News', renderNews);
  registerRoute('/Treatment', renderTreatmentOverview);
  registerRoute('/Treatment/FreeGamblingAssessment', renderFreeAssessment);
  registerRoute('/Treatment/ForGamblers', renderForGamblers);
  registerRoute('/Treatment/ForFamilyAndLovedOnes', renderForFamilyAndLovedOnes);
  registerRoute('/Treatment/TelehealthOptions', renderTelehealthOptions);
  registerRoute('/Treatment/Telehealth', renderTelehealthOptions);
  registerRoute('/Treatment/SelfHelpOptions', renderSelfHelpOptions);
  registerRoute('/Resources/AudioAndVideoLibrary', () => {
    setContent(typeof audioVideoLibraryContent !== 'undefined' ? audioVideoLibraryContent : originalContent);
  });
  registerRoute('/Resources', renderResourcesOverview);
  registerRoute('/Resources/SuggestedReadings', renderSuggestedReadings);
  registerRoute('/Resources/SuggestedReading', renderSuggestedReadings);
  registerRoute('/Resources/FinancialResources', renderFinancialResources);
  registerRoute('/Resources/MythsAndFacts', renderMythsAndFacts);
  registerRoute('/Resources/NevadaCouncilOnProblemGambling', renderNevadaCouncil);
  registerRoute('/Resources/SelfExclusion', renderSelfExclusion);
  registerRoute('/Resources/NevadaGamblingDiversionCourt', renderDiversionCourt);
  registerRoute('/Resources/ArticlesOnGamblingAddiction', renderArticlesOverview);
  registerRoute('/Resources/Articles', renderArticlesOverview);
  registerRoute('/Resources/Podcasts', () => {
    setContent(typeof podcastContent !== 'undefined' ? podcastContent : originalContent);
  });
  registerRoute('/Resources/ContinuumOfGamblingBehavior', () => {
    setContent(typeof continuumOfGamblingContent !== 'undefined' ? continuumOfGamblingContent : originalContent);
  });
  registerRoute('/Resources/MindfulnessMeditation', () => {
    setContent(typeof mindfulnessContent !== 'undefined' ? mindfulnessContent : originalContent);
  });
  registerRoute('/Resources/SimilaritiesAndDifferences', () => {
    setContent(typeof similaritiesAndDifferencesContent !== 'undefined' ? similaritiesAndDifferencesContent : originalContent);
  });
  registerRoute('/Resources/Weblinks', renderWeblinks);
  registerRoute('/Treatment/SelfAssessmentQuestionnaire', renderSelfAssessment);
  registerRoute('/ContactUs', renderContact);
  registerRoute('/Research', renderResearchOverview);
  registerRoute('/Research/ArticlesAndPublications', () => {
    setContent(typeof articlesAndPublicationsContent !== 'undefined' ? articlesAndPublicationsContent : originalContent);
  });
  registerRoute('/Research/ResearchRounds', () => {
    setContent(typeof researchRoundsContent !== 'undefined' ? researchRoundsContent : originalContent);
  });

  enhanceRouteLinks();

  navigate(window.location.pathname || '/', { replace: true, skipScroll: true });

  window.addEventListener('popstate', () => {
    render(window.location.pathname || '/', { skipScroll: false });
  });
})();
