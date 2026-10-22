---
layout: archive
title: "Academic profile"
permalink: /academic-profile/
author_profile: true
redirect_from:
  - /cv/
  - /resume
  - /resume/
  - /trajetoria-academica/
---

{% assign profile = site.data.academic_profile %}
<style>
.academic-profile { --profile-border: #d8dee4; }
.academic-profile [data-content-language="pt"] { display: none; }
html[data-site-language="pt"] .academic-profile [data-content-language="en"] { display: none; }
html[data-site-language="pt"] .academic-profile [data-content-language="pt"] { display: inline; }
.academic-profile .profile-links { display: flex; flex-wrap: wrap; gap: .6rem; margin: 1rem 0 1.6rem; }
.academic-profile .profile-links a { display: inline-block; padding: .3rem .7rem; border: 1px solid var(--profile-border); border-radius: .25rem; text-decoration: none; }
.academic-profile .profile-jump { display: flex; flex-wrap: wrap; gap: .5rem 1.2rem; padding: 0; margin: 0 0 1.7rem; list-style: none; font-size: .9em; }
.academic-profile section { scroll-margin-top: 5rem; }
.academic-profile .profile-timeline { list-style: none; margin: 0; padding: 0; }
.academic-profile .profile-entry { border-left: 3px solid var(--profile-border); margin: 0 0 1.4rem; padding: .1rem 0 .1rem 1rem; }
.academic-profile .profile-entry h3 { margin: .15rem 0 .3rem; font-size: 1.05em; line-height: 1.4; }
.academic-profile .profile-entry p { margin: .35rem 0; }
.academic-profile .profile-period { font-size: .85em; opacity: .8; }
.academic-profile .profile-institution { font-weight: 600; }
.academic-profile .profile-note { font-size: .88em; }
.academic-profile .profile-reviews { padding-left: 1.2rem; }
.academic-profile .profile-reviews li { margin-bottom: .6rem; }
@media print { .academic-profile .profile-jump { display: none; } .academic-profile .profile-entry { break-inside: avoid; } }
</style>

<div class="academic-profile">
  <p><span lang="en" data-content-language="en">{{ profile.intro_en | escape_once }}</span><span lang="pt-BR" data-content-language="pt">{{ profile.intro_pt | escape_once }}</span></p>
  <div class="profile-links">
    <a href="{{ profile.lattes_url | escape_once }}" rel="noopener noreferrer"><span lang="en" data-content-language="en">Full Lattes résumé</span><span lang="pt-BR" data-content-language="pt">Currículo Lattes completo</span></a>
    <a href="{{ profile.orcid_url | escape_once }}" data-no-translate>ORCID</a>
  </div>
  <nav aria-label="Academic profile sections">
    <ul class="profile-jump">
      <li><a href="#education"><span lang="en" data-content-language="en">Education</span><span lang="pt-BR" data-content-language="pt">Formação</span></a></li>
      <li><a href="#experience"><span lang="en" data-content-language="en">Experience</span><span lang="pt-BR" data-content-language="pt">Experiência</span></a></li>
      <li><a href="#editorial"><span lang="en" data-content-language="en">Editorial activities</span><span lang="pt-BR" data-content-language="pt">Atuação editorial</span></a></li>
      <li><a href="#peer-review"><span lang="en" data-content-language="en">Peer review</span><span lang="pt-BR" data-content-language="pt">Revisão científica</span></a></li>
    </ul>
  </nav>

  <section id="education">
    <h2><span lang="en" data-content-language="en">Education</span><span lang="pt-BR" data-content-language="pt">Formação</span></h2>
    <ul class="profile-timeline">
    {% for degree in profile.education %}
      <li class="profile-entry" id="education-{{ degree.id | escape_once }}">
        <p class="profile-period" data-no-translate>{{ degree.year | escape_once }}</p>
        <h3><span lang="en" data-content-language="en">{{ degree.degree_en | escape_once }}</span><span lang="pt-BR" data-content-language="pt">{{ degree.degree_pt | escape_once }}</span></h3>
        <p class="profile-institution" data-no-translate>{{ degree.institution | escape_once }}</p>
        <p class="profile-note"><span lang="en" data-content-language="en">{{ degree.period_en | escape_once }}</span><span lang="pt-BR" data-content-language="pt">{{ degree.period_pt | escape_once }}</span></p>
        <p><span lang="en" data-content-language="en">Research title: </span><span lang="pt-BR" data-content-language="pt">Título do trabalho: </span><em data-no-translate>{{ degree.title | escape_once }}</em></p>
        <p class="profile-note"><span lang="en" data-content-language="en">{{ degree.advisors_label_en | escape_once }}: </span><span lang="pt-BR" data-content-language="pt">{{ degree.advisors_label_pt | escape_once }}: </span><span data-no-translate>{{ degree.advisors | escape_once }}</span></p>
      </li>
    {% endfor %}
    </ul>
  </section>

  <section id="experience">
    <h2><span lang="en" data-content-language="en">Experience</span><span lang="pt-BR" data-content-language="pt">Experiência</span></h2>
    <ul class="profile-timeline">
    {% for job in profile.experience %}
      <li class="profile-entry" id="experience-{{ job.id | escape_once }}">
        <p class="profile-period"><span lang="en" data-content-language="en">{{ job.period_en | escape_once }}</span><span lang="pt-BR" data-content-language="pt">{{ job.period_pt | escape_once }}</span></p>
        <h3><span lang="en" data-content-language="en">{{ job.role_en | escape_once }}</span><span lang="pt-BR" data-content-language="pt">{{ job.role_pt | escape_once }}</span></h3>
        <p class="profile-institution" data-no-translate>{{ job.institution | escape_once }}</p>
        <p><span lang="en" data-content-language="en">{{ job.description_en | escape_once }}</span><span lang="pt-BR" data-content-language="pt">{{ job.description_pt | escape_once }}</span></p>
        {% if job.additional_en %}<p class="profile-note"><span lang="en" data-content-language="en">{{ job.additional_en | escape_once }}</span><span lang="pt-BR" data-content-language="pt">{{ job.additional_pt | escape_once }}</span></p>{% endif %}
      </li>
    {% endfor %}
    </ul>
  </section>

  <section id="editorial">
    <h2><span lang="en" data-content-language="en">Editorial activities</span><span lang="pt-BR" data-content-language="pt">Atuação editorial</span></h2>
    <ul class="profile-timeline">
    {% for activity in profile.editorial %}
      <li class="profile-entry" id="editorial-{{ activity.id | escape_once }}">
        <h3><span lang="en" data-content-language="en">{{ activity.role_en | escape_once }}</span><span lang="pt-BR" data-content-language="pt">{{ activity.role_pt | escape_once }}</span></h3>
        <p class="profile-institution" data-no-translate>{{ activity.journal | escape_once }}</p>
        <p><span lang="en" data-content-language="en">Special issue: </span><span lang="pt-BR" data-content-language="pt">Edição temática: </span><a href="{{ activity.url | escape_once }}" data-no-translate>{{ activity.issue | escape_once }}</a></p>
        <p><span lang="en" data-content-language="en">{{ activity.description_en | escape_once }}</span><span lang="pt-BR" data-content-language="pt">{{ activity.description_pt | escape_once }}</span></p>
      </li>
    {% endfor %}
    </ul>
  </section>

  <section id="peer-review">
    <h2><span lang="en" data-content-language="en">Peer review</span><span lang="pt-BR" data-content-language="pt">Revisão científica</span></h2>
    <h3><span lang="en" data-content-language="en">Journals</span><span lang="pt-BR" data-content-language="pt">Periódicos</span></h3>
    <ul class="profile-reviews profile-journals">
    {% for journal in profile.journal_reviews %}
      <li><span data-no-translate>{{ journal.name | escape_once }}</span>{% if journal.period_en %} <span class="profile-note">(<span lang="en" data-content-language="en">{{ journal.period_en | escape_once }}</span><span lang="pt-BR" data-content-language="pt">{{ journal.period_pt | escape_once }}</span>)</span>{% endif %}</li>
    {% endfor %}
    </ul>
    <h3><span lang="en" data-content-language="en">Conferences and symposia</span><span lang="pt-BR" data-content-language="pt">Congressos e simpósios</span></h3>
    <ul class="profile-reviews profile-conferences">
    {% for conference in profile.conference_reviews %}
      <li data-no-translate><strong>{{ conference.acronym | escape_once }}</strong> — {{ conference.name | escape_once }}</li>
    {% endfor %}
    </ul>
  </section>
</div>
