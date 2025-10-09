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
    document.querySelectorAll('[data-route].active-route').forEach((link) => {
      link.classList.remove('active-route');
    });
    document.querySelectorAll(`[data-route="${path}"]`).forEach((link) => {
      link.classList.add('active-route');
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
  registerRoute('/Resources/AudioAndVideoLibrary', () => {
    setContent(typeof audioVideoLibraryContent !== 'undefined' ? audioVideoLibraryContent : originalContent);
  });
  registerRoute('/Resources/ArticlesOnGamblingAddiction', renderArticlesOverview);
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
  registerRoute('/Treatment/SelfAssessmentQuestionnaire', renderSelfAssessment);
  registerRoute('/ContactUs', renderContact);
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
