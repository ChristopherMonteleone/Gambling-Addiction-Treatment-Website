const podcastContent = `
<h1>Podcasts</h1>
<div class="podcast-section">
    <div class="podcast-item">
        <img src="AllInPodcastCover.jpg" alt="All In Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://endgamblingharm.com/all-in/" target="_blank"><b>All In: The Addicted Gambler's Podcast</b></a></p>
            <p>Brian Hatch uses his podcast platform to have conversations and gambling addiction and how it impacts individuals, families, and society.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="BrokeGirlSocietyPodcastCover.jpg" alt="Broke Girl Society Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://thebrokegirlsociety.com/" target="_blank"><b>The Broke Girl Society Podcast</b></a></p>
            <p>Christina Cook talks with others experiencing gambling addiction with a focus on women struggling with problem gambling.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="AfterGamblingPodcastCover.jpg" alt="After Gambling Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://aftergambling.com/" target="_blank"><b>The After Gambling Podcast</b></a></p>
            <p>Jamie, a former problem gambler, created his podcast and website as a resource to help problem gamblers with their journey to a life of balance and emotional health.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="fallInPodcastCover.jpg" alt="Fall In Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://endgamblingharm.com/fall-in/" target="_blank"><b>Fall In</b></a></p>
            <p>Dave Yeager shares stories of gambling addiction in the military, creating a safe space to learn and listen.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="foldEmPodcastCover.jpg" alt="Fold Em Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://www.gamblingproblemhelp.ca/" target="_blank"><b>Fold em: Help for Gambling Problems</b></a></p>
            <p>Offers straight talk about dealing with the fall-out from gambling, whether stopping or scaling back gambling.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="fantasyOrRealityPodcastCover.jpg" alt="Fantasy or Reality Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://open.spotify.com/show/6xI0Lv0zgo1QnEFmSfOAG9?si=e8bdca6546c74eb9&nd=1&dlsi=1487edcf36294f5b" target="_blank"><b>Fantasy or Reality: The GPP</b></a></p>
            <p>Steve, a recovering addict, shares his journey through addiction and recovery, focusing on gambling and its impacts.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="helloCraigPodcastCover.jpg" alt="Hello, My Name is Craig Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://open.spotify.com/show/5ZI7LzYelXsMH4RAHmPWCW?si=3ce6a6edf59a4c31&nd=1&dlsi=fde7782c0165466e" target="_blank"><b>Hello, My Name is Craig</b></a></p>
            <p>Craig and his guests discuss gambling addiction, sharing stories and providing guidance for recovery.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="allBetsOffPodcastCover.jpg" alt="All Bets Are Off Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://www.allbetsareoff.co.uk/" target="_blank"><b>All Bets Are Off - Gambling Addiction Recovery Podcast</b></a></p>
            <p>Established in April 2020, this podcast covers a wide range of topics related to gambling addiction recovery.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="invisibleAddictionPodcastCover.jpg" alt="The Invisible Addiction Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://www.theinvisibleaddiction.com/" target="_blank"><b>The Invisible Addiction</b></a></p>
            <p>Podcasts for people who've felt gambling problems and identify with stories echoing their own experiences.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="hiddenAddictionPodcastCover.jpg" alt="The Hidden Addiction Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://open.spotify.com/show/1TvyYwpUCIlVVDmMHpHK51?si=6228dcd2507a4eae&nd=1&dlsi=91054f3664a64ce6" target="_blank"><b>The Hidden Addiction Podcast</b></a></p>
            <p>Increases awareness about problem gambling and advocates for support services for those affected.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="problemGamblingPodcastCover.jpg" alt="The Problem Gambling Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://www.problemgambling.ie/" target="_blank"><b>The Problem Gambling Podcast</b></a></p>
            <p>Explores issues surrounding problem gambling and gambling-related harm.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="321PodcastCover.jpg" alt="3-21 NoKiddin' Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://open.spotify.com/show/1sOPeFgsNgItcqHNV1TTB7?si=519426c9cd6c4da6&nd=1&dlsi=78a7f284f7a54217" target="_blank"><b>3-21 NoKiddin' Gambling Addiction Recovery Podcast</b></a></p>
            <p>Bobbie the Awesome discusses gambling addiction, self-care, and recovery strategies.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="voicesPodcastCover.jpg" alt="Voices Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://open.spotify.com/show/0qzQL6Hnth8AV914GCkITv?si=ca9a1e22bb3746bf&nd=1&dlsi=f1dd8dfb7b314e38" target="_blank"><b>Voices...the podcast</b></a></p>
            <p>Dedicated to bringing you insights about programs of recovery.</p>
        </div>
    </div>
    <div class="podcast-item">
        <img src="ambitiousAddictsPodcastCover.jpg" alt="Ambitious Addicts Podcast Cover" class="podcast-cover">
        <div class="podcast-description">
            <p><a href="https://ambitiousaddicts.com/" target="_blank"><b>Ambitious Addicts</b></a></p>
            <p>A weekly show about addiction recovery, ambition in recovery, and real-life stories of recovery.</p>
        </div>
    </div>
</div>
`;