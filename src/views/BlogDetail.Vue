<template>
  <div v-if="issue" class="blog-detail-container">
    <div class="title-container">
      <span class="title">{{issue.title}}</span>
      <ul>
        <li class="tag tag-small" v-for="label in issue.labels" :key="label.id" @click="setActiveLabel(label)"
            :style="{ backgroundColor: '#' + label.color}">{{label.name}}
        </li>
      </ul>
      <span class="back" @click="back">
        <img src="../assets/back-icon.svg" class="back-icon">返回
      </span>
    </div>
    <div class="comment-container bga-back-top" ref="commentContainer">
      <comment :comment="issue"/>

      <div class="line"></div>
      <div class="post-actions">
        <a href="javascript:;" @click="rewards" class="action-rewards">赞赏支持</a>
      </div>
      <!-- <div class="article-nav">
        <a href="javascript:;" @click="articlePrev" class="article-nav-prev">上一篇</a>
        <a href="javascript:;" @click="articleNext" class="article-nav-next">下一篇</a>
      </div> -->
      <comment v-for="comment in comments" :key="comment.id" :comment="comment"/>
      <add-comment :commentsUrl="issue.comments_url" @addCommentSuccess="handleAddCommentSuccess"/>
      <!-- <div class="">赞赏支持</div> -->
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Comment from '../components/Comment.vue'
  import AddComment from '../components/AddComment.vue'

  export default{
    data () {
      return {
        issue: null,
        number: null,
        comments: [],
        newComment: null
      }
    },
    components: {Comment, AddComment},
    methods: {
      ...mapActions([
        'updateActiveLabel'
      ]),
      setActiveLabel (label) {
        this.updateActiveLabel(label)
        this.$router.push('/Blog')
      },
      getComments () {
        if (this.issue && this.issue.comments > 0) {
          this.$gitHubApi.getComments(this, this.issue.comments_url).then(response => {
            this.comments = response.data
          })
        }
      },
      getIssue () {
        this.$gitHubApi.getIssue(this, this.number).then(response => {
          this.issue = response.data
          this.getComments()
        })
      },
      back () {
        this.$router.go(-1)
      },
      handleAddCommentSuccess (comment) {
        this.comments.push(comment)
        this.$nextTick(() => {
          // 如果这里不加个 setTimeout 的话，Comment 数量太多时不会自动滚动到底部
          setTimeout(() => {
            let commentContainer = this.$refs.commentContainer
            commentContainer.scrollTop = commentContainer.scrollHeight - commentContainer.clientHeight
          }, 16)
        })
      },
      articlePrev () {
        alert('上一页')
      },
      articleNext () {
        alert('下一页')
      },
      rewards () {
        this.$msgBox.showMsgBox({
          title: '觉得文章有用就打赏一下文章作者',
          isShowInput: true
        }).then(async (val) => {
          // ...
        }).catch(() => {
          // ...
        })
      }
    },
    created () {
      if (this.$route.params.issue) {
        this.issue = this.$route.params.issue
      } else {
        if (this.$route.params.number) {
          this.number = this.$route.params.number
        } else {
          this.$router.replace('/')
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        if (this.issue) {
          this.getComments()
        } else {
          this.getIssue()
        }
      })
    }
  }

</script>
